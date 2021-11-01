import * as path from 'path';
import * as iam from '@aws-cdk/aws-iam';
import { DeprecatedSymbols } from '@aws-cdk/cdk-build-tools';
import * as cdk from '@aws-cdk/core';
import * as cxapi from '@aws-cdk/cx-api';
import * as assets from '../lib';

// Marking test as deprecated until https://github.com/aws/jsii/issues/3102 is fixed.
const deprecated = DeprecatedSymbols.quiet();

const app = new cdk.App({
  context: {
    [cxapi.DOCKER_IGNORE_SUPPORT]: true,
  },
});
const stack = new cdk.Stack(app, 'integ-assets-docker');

const asset = new assets.DockerImageAsset(stack, 'DockerImage', {
  directory: path.join(__dirname, 'demo-image'),
});

const asset2 = new assets.DockerImageAsset(stack, 'DockerImage2', {
  directory: path.join(__dirname, 'demo-image'),
});

const user = new iam.User(stack, 'MyUser');
asset.repository.grantPull(user);
asset2.repository.grantPull(user);

new cdk.CfnOutput(stack, 'ImageUri', { value: asset.imageUri });

app.synth();

DeprecatedSymbols.reset(deprecated);