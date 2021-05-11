#!/bin/bash -ex

yarn typecheck
#TODO: enable lint and tests when fixed
#yarn lint
yarn test

rm -rf dist
tsc -p .
rm -fr dist/__tests__
