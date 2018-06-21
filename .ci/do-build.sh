#!/bin/bash
##
## Description:
##
## This script invoques the actual build script
## inside a docker container


source .ci/common.sh

info "Running build inside a custom docker image..."

mkdir /tmp/yarn-cache-bamboo
chmod 0777 /tmp/yarn-cache-bamboo

docker login \
  -u $ARTIFACTORY_USERNAME \
  -p $ARTIFACTORY_PASSWORD


docker run -t --rm \
  -v $PWD:/build \
  -v /tmp/yarn-cache-bamboo:/tmp/yarn-cache \
  -e bamboo_buildNumber=${bamboo_buildNumber} \
  -e bamboo_repository_branch_name=${bamboo_repository_branch_name} \
  -w /build dockergooru/fe-build ./.ci/build.sh
