import * as iam from '@aws-cdk/aws-iam';
import * as firehose from '@aws-cdk/aws-kinesisfirehose';
import * as s3 from '@aws-cdk/aws-s3';
import { Construct } from 'constructs';
import { BackupMode, CommonDestinationProps, CommonS3Props } from './common';
import { createBackupConfig, createBufferingHints, createEncryptionConfig, createLoggingOptions, createProcessingConfig } from './private/helpers';

/**
 * Props for defining an S3 destination of a Kinesis Data Firehose delivery stream.
 */
export interface S3BucketProps extends CommonS3Props, CommonDestinationProps {
}

/**
 * An S3 bucket destination for data from a Kinesis Data Firehose delivery stream.
 */
export class S3Bucket implements firehose.IDestination {
  constructor(private readonly bucket: s3.IBucket, private readonly props: S3BucketProps = {}) {
    if (this.props.backupConfiguration?.backupMode === BackupMode.FAILED) {
      throw new Error('S3 destinations do not support BackupMode.FAILED');
    }
  }

  bind(scope: Construct, _options: firehose.DestinationBindOptions): firehose.DestinationConfig {
    const role = this.props.role ?? new iam.Role(scope, 'S3 Destination Role', {
      assumedBy: new iam.ServicePrincipal('firehose.amazonaws.com'),
    });

    const bucketGrant = this.bucket.grantReadWrite(role);

    const { loggingOptions, dependables: loggingDependables } = createLoggingOptions(scope, {
      logging: this.props.logging,
      logGroup: this.props.logGroup,
      role,
      streamId: 'S3Destination',
    }) ?? {};

    const { backupConfig, dependables: backupDependables } = createBackupConfig(scope, role, this.props.backupConfiguration) ?? {};
    return {
      extendedS3DestinationConfiguration: {
        cloudWatchLoggingOptions: loggingOptions,
        processingConfiguration: createProcessingConfig(scope, role, this.props.processors),
        roleArn: role.roleArn,
        s3BackupConfiguration: backupConfig,
        s3BackupMode: this.getS3BackupMode(),
        bufferingHints: createBufferingHints(this.props.bufferingInterval, this.props.bufferingSize),
        bucketArn: this.bucket.bucketArn,
        compressionFormat: this.props.compression?.value,
        encryptionConfiguration: createEncryptionConfig(role, this.props.encryptionKey),
        errorOutputPrefix: this.props.errorOutputPrefix,
        prefix: this.props.dataOutputPrefix,
      },
      dependables: [bucketGrant, ...(loggingDependables ?? []), ...(backupDependables ?? [])],
    };
  }

  private getS3BackupMode(): string {
    if (this.props.backupConfiguration?.backupBucket || this.props.backupConfiguration?.backupMode === BackupMode.ALL) {
      return 'Enabled';
    }
    return 'Disabled';
  }
}
