#!/usr/bin/env bash

DIR=$PWD

echo "[GabCI]: npm install"

npm install

echo "[GabCI]: lint"

npm run lint

echo "[GabCI]: Test with coverage"

npm run test:coverage:ci
