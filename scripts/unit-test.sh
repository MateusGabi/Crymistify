#!/usr/bin/env bash

DIR=$PWD

echo "[GabCI]: npm install"

npm install

echo "[GabCI]: Test with coverage"

npm run test:coverage:ci
