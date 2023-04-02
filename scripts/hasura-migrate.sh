#!/bin/bash

# configファイルのあるディレクトリに移動
cd ../hasura || exit

# マイグレーション実行とメタデータの適用
npx hasura deploy --disable-interactive --endpoint "${_HASURA_GRAPHQL_ENDPOINT}" --admin-secret "${_HASURA_GRAPHQL_ADMIN_SECRET}"
