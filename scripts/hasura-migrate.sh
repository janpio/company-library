#!/bin/bash

# Hasura CLIをインストールする
yarn || exit

# configファイルのあるディレクトリに移動
cd ../hasura || exit

# マイグレーション実行とメタデータの適用
npx hasura deploy --disable-interactive
