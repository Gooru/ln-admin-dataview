#!/bin/bash
##
## Description:
##
## This script invoques the actual build script
## inside a docker container
##


source .ci/common.sh

if [ -z "$S3_BUCKET" ]; then
  error "No S3 bucket specified."
  exit 1
fi

if [[ -z "$AWS_ACCESS_KEY_ID" ]] || [[ -z "$AWS_SECRET_ACCESS_KEY" ]] || [[ -z "$AWS_DEFAULT_REGION" ]]; then
  error "No AWS credentials provided."
  exit 1
fi

info "Running build inside a custom docker image..."

mkdir /tmp/yarn-cache-bamboo
chmod 0777 /tmp/yarn-cache-bamboo
rm -rf /tmp/yarn-cache-bamboo/v1/.tmp

docker login \
  -u $ARTIFACTORY_USERNAME \
  -p $ARTIFACTORY_PASSWORD edify-dkr.jfrog.io


docker run -t --rm \
  -v $PWD:/build \
  -v /tmp/yarn-cache-bamboo:/tmp/yarn-cache \
  -e bamboo_buildNumber=${bamboo_buildNumber} \
  -e bamboo_repository_branch_name=${bamboo_repository_branch_name} \
  -w /build edify-dkr.jfrog.io/gooru-fe-builder ./.ci/build.sh
