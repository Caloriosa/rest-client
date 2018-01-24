#!/bin/bash

if [ -z ${CIRCLE_TAG} ]; then
  echo "No release tag specified in CI. Deploy skipped!"
  exit 0
fi

echo "Release ${CIRCLE_TAG}"

yarn publish --new-version ${CIRCLE_TAG}