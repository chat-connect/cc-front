# cc-web
chat-connectのフロントエンド。

## 環境構築
1.コンテナを起動
```
docker compose -f docker-compose.local.yml up -d --build
```
2.モジュールのインストール
```
docker compose -f docker-compose.local.yml exec web yarn install
```
3.Nuxtサーバーを起動
```
docker compose -f docker-compose.local.yml exec web yarn dev
```
