import * as path from 'path';
import * as iam from '@aws-cdk/aws-iam';
import { DeprecatedSymbols } from '@aws-cdk/cdk-build-tools';
import * as cdk from '@aws-cdk/core';
import * as assets from '../lib';

class TestStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    /// !show
    const asset = new assets.Asset(this, 'SampleAsset', {
      path: path.join(__dirname, 'file-asset.txt'),
    });
    /// !hide

    const user = new iam.User(this, 'MyUser');
    asset.grantRead(user);
  }
}

// Marking test as deprecated until https://github.com/aws/jsii/issues/3102 is fixed.
const deprecated = DeprecatedSymbols.quiet();

const app = new cdk.App();
new TestStack(app, 'aws-cdk-asset-file-test');
app.synth();

DeprecatedSymbols.reset(deprecated);
