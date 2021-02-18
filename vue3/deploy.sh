#! /bin/bash

echo "打包生产环境代码"
echo "##################"

rm -rf dist && npm run build

echo "上传代码到腾讯云"
echo "##################"

cd dist &&  scp -r * root@45.40.202.60:/usr/local/nginx/html

echo "部署完毕"