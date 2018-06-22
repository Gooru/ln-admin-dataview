#!/bin/bash
##
## Description:
##
## Actual build script meant to be run inside the node docker container
##
## Tasks:
## - run tests
## - build (normal and embedded)
## - generante artifacts (normal and embedded)
##

source .ci/common.sh

GIT_BRANCH=$(echo $bamboo_repository_branch_name | sed 's/\//-/')
BUILD_NUMBER=${bamboo_buildNumber}
export VERSION=${GIT_BRANCH}-${BUILD_NUMBER}


info "Installing npm dependencies..."
silent yarn install

info "Installing bower dependencies..."
silent bower install --allow-root

info "Running eslint..."
silent grunt bamboo-eslint

info "Running tests..."
silent grunt bamboo-test

info "Building..."
silent grunt build:prod-bamboo
echo $VERSION > admin-dataview/version.html

info "Rename filename as research ..."
mv admin-dataview research

info "Creating artifact with version ${VERSION}..."
tar czf research-${VERSION}.tar.gz research/ appspec.yml .deploy/
