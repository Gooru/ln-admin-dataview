#!/bin/bash
##
## Description:
##
## This script publishes the build artifact to an S3 bucket
##

source .ci/common.sh

GIT_BRANCH=$(echo ${bamboo_repository_branch_name} | sed 's/\//-/')
BUILD_NUMBER=${bamboo_buildNumber}
VERSION=${GIT_BRANCH}-${BUILD_NUMBER}

if [ -z "$S3_BUCKET" ]; then
  error "No S3 bucket specified."
  exit 1
fi

if [[ -z "$AWS_ACCESS_KEY_ID" ]] || [[ -z "$AWS_SECRET_ACCESS_KEY" ]] || [[ -z "$AWS_DEFAULT_REGION" ]]; then
  error "No AWS credentials provided."
  exit 1
fi

info "Publishing artifacts..."

silent aws s3 cp research-${VERSION}.tar.gz \
  s3://${S3_BUCKET}/frontend-30/builds/${GIT_BRANCH}/research-$VERSION.tar.gz

info "Done publishing artifacts"
