#!/bin/bash

# Hasura CLIをインストールする
yarn

# configファイルのあるディレクトリに移動
cd ../hasura || exit

# マイグレーション実行とメタデータの適用
hasura deploy --disable-interactive
