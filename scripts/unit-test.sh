#!/usr/bin/env bash

DIR=$PWD

echo "[GabCI]: NPM Install"

echo $PWD

npm install

echo "[GabCI]: Jest Test"

npm run test
