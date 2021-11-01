import * as path from 'path';
import * as iam from '@aws-cdk/aws-iam';
import { DeprecatedSymbols } from '@aws-cdk/cdk-build-tools';
import * as cdk from '@aws-cdk/core';
import * as assets from '../lib';

class TestStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The template must contain at least one resource, so there is this...
    new iam.User(this, 'DummyResource');

    // Check that the same asset added multiple times is
    // uploaded and copied.
    new assets.Asset(this, 'SampleAsset1', {
      path: path.join(__dirname, 'file-asset.txt'),
    });

    new assets.Asset(this, 'SampleAsset2', {
      path: path.join(__dirname, 'file-asset.txt'),
    });
  }
}

// Marking test as deprecated until https://github.com/aws/jsii/issues/3102 is fixed.
const deprecated = DeprecatedSymbols.quiet();

const app = new cdk.App();
new TestStack(app, 'aws-cdk-multi-assets');
app.synth();

DeprecatedSymbols.reset(deprecated);
