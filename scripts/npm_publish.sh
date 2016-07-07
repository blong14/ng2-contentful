#!/usr/bin/env bash

ROOT_DIR=$(cd $(dirname $0)/..; pwd)
cd ${ROOT_DIR}

NPM_DIR=${ROOT_DIR}/dist/ng2-contentful
rm -fr ${NPM_DIR}

# clean dir
gulp clean
gulp copy:package.json

# it'll be replaced with build:prod
npm run compile
npm publish ${NPM_DIR}

