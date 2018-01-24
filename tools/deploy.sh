#!/bin/bash

VERSION=$(git describe)

echo "Release ${VERSION}"

yarn publish --new-version ${VERSION}