#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm install
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME
git init
git branch -m master main
git config --global init.defaultBranch main
git config --global user.email "2579873098@qq.com"
git config --global user.name "Alex"
git add .
git commit -m 'deploy'
git status
# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:Xiexiong-zzm/Interview-record.git main:code-pages

