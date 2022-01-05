#!/bin/bash

branch=master
url=https://gitee.com/alienwareBoy/mini-program.git
scenes=dev

# branch=$1
# url=$2
# scenes=$3

git clone -b $1 $2

npm install

npm run build:$3

npm run upload:$3
