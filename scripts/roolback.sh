#!/bin/bash

echo "正在回滚到上一次提交..."

git reset --hard HEAD
git clean -fd
rm -rf .next

echo "回滚完成。"
echo "请重新运行：npm run dev"