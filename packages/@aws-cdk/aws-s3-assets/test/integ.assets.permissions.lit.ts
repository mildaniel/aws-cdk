import * as path from 'path';
import * as iam from '@aws-cdk/aws-iam';
import { DeprecatedSymbols } from '@aws-cdk/cdk-build-tools';
import * as cdk from '@aws-cdk/core';
import * as assets from '../lib';

class TestStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const asset = new assets.Asset(this, 'MyFile', {
      path: path.join(__dirname, 'file-asset.txt'),
    });

    /// !show
    const group = new iam.Group(this, 'MyUserGroup');
    asset.grantRead(group);
    /// !hide
  }
}

// Marking test as deprecated until https://github.com/aws/jsii/issues/3102 is fixed.
const deprecated = DeprecatedSymbols.quiet();

const app = new cdk.App();
new TestStack(app, 'aws-cdk-asset-refs');
app.synth();

DeprecatedSymbols.reset(deprecated);
