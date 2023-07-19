# cc-front
chat-connectのフロントエンド。

## 環境構築
1.コンテナを起動
```
docker compose up -d --build
```
2.モジュールのインストール
```
docker container exec -it cc-front-nuxt-1 yarn install
```
3.Nuxtサーバーを起動
```
docker container exec -it cc-front-nuxt-1 yarn dev
```
