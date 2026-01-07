# SquatLock LP

スクワットでスマホ依存を断つアプリ「SquatLock」のランディングページ。

🌐 **本番URL**: https://squatlock.saki-paru.com

## セットアップ

```bash
# リポジトリをクローン
git clone https://github.com/kinoko-kinoko/SquatLock-LP.git
cd SquatLock-LP

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

## 環境変数の設定（PostHog分析）

1. [PostHog](https://posthog.com)でアカウントを作成
2. Project Settings → Project API Keyをコピー
3. `.env`ファイルを作成

```bash
cp .env.example .env
# .envを編集してAPIキーを設定
```

## デプロイ

```bash
# Vercelにデプロイ
npx vercel --prod
```

## ページ構成

| パス | 説明 |
|------|------|
| `/` | メインランディングページ |
| `/links` | SNSプロフィール用リンク集 |

## UTMパラメータ

SNSからの流入を計測するためのUTMパラメータ例：

```
# TikTok
https://squatlock.saki-paru.com/links?utm_source=tiktok&utm_medium=profile

# Instagram
https://squatlock.saki-paru.com/links?utm_source=instagram&utm_medium=profile

# YouTube
https://squatlock.saki-paru.com/?utm_source=youtube&utm_medium=social&utm_campaign=動画ID

# X (Twitter)
https://squatlock.saki-paru.com/?utm_source=twitter&utm_medium=social
```

## 技術スタック

- React + Vite
- TailwindCSS v4
- PostHog (アナリティクス)
- react-router-dom (ルーティング)
