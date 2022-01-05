#!/bin/bash

branch=master
url=https://gitee.com/alienwareBoy/mini-program.git
scenes=dev

# branch=$1
# url=$2
# scenes=$3

git clone https://gitee.com/alienwareBoy/mini-program.git

cd mini-program

echo "进入打包目录"

echo "安装依赖"

npm install

echo "依赖安装成功"

npm run build:dev

echo "打包成功"

npm run upload:dev
