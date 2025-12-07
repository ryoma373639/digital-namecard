# デジタル名刺 - Digital Namecard 💼

モダンでインタラクティブなデジタル名刺Webアプリケーション。プロフィール表示、SNSリンク統合、AI搭載チャットボット機能を備えています。

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ryoma373639/digital-namecard)

## ✨ 特徴

- **👤 プロフィール表示**: アバター、名前、肩書き、自己紹介を美しく表示
- **🔗 SNSリンク統合**: Instagram、X (Twitter)、Threadsへのリンク
- **🤖 AI搭載チャットボット**: Claude APIを使用した対話型AI
- **📱 レスポンシブデザイン**: モバイル、タブレット、デスクトップに対応
- **🎨 モダンUI**: Tailwind CSSとアニメーション効果
- **⚡ 高速パフォーマンス**: Next.js 14のApp Router採用

## 🛠️ 技術スタック

- **フロントエンド**: Next.js 14 (App Router), React 19, TypeScript
- **スタイリング**: Tailwind CSS
- **AIインテグレーション**: Claude API (@anthropic-ai/sdk)
- **アイコン**: Lucide React
- **デプロイ**: Vercel

## 🚀 クイックスタート

### 前提条件

- Node.js 18.0以上
- npm または yarn
- Anthropic APIキー（AIチャットボット機能用）

### インストール

1. **リポジトリをクローン**
   ```bash
   git clone https://github.com/ryoma373639/digital-namecard.git
   cd digital-namecard
   ```

2. **依存関係をインストール**
   ```bash
   npm install
   ```

3. **環境変数を設定**
   ```bash
   cp .env.example .env.local
   ```

   `.env.local`ファイルを作成して、Anthropic APIキーを設定：
   ```
   ANTHROPIC_API_KEY=your_actual_api_key_here
   ```

   APIキーの取得: https://console.anthropic.com/

4. **開発サーバーを起動**
   ```bash
   npm run dev
   ```

5. **ブラウザでアクセス**
   ```
   http://localhost:3000
   ```

## 📁 プロジェクト構造

```
digital-namecard/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # Claude APIエンドポイント
│   ├── globals.css                # グローバルスタイル
│   ├── layout.tsx                 # ルートレイアウト
│   └── page.tsx                   # メインページ（デジタル名刺）
├── public/                        # 静的ファイル
├── .env.example                   # 環境変数のサンプル
├── next.config.mjs                # Next.js設定
├── tailwind.config.js             # Tailwind CSS設定
├── tsconfig.json                  # TypeScript設定
├── DEPLOY.md                      # デプロイガイド
└── package.json                   # 依存関係
```

## 🎨 カスタマイズ

### プロフィール情報の変更

`app/page.tsx` ファイルを編集：

```tsx
<h1>Your Name</h1>              {/* 名前を変更 */}
<p>Professional Title / Role</p>  {/* 肩書きを変更 */}
```

### SNSリンクの変更

`app/page.tsx` ファイル内のリンクURLを変更：

```tsx
<a href="https://instagram.com/yourusername" ...>
```

### AIアシスタントのパーソナライズ

`app/api/chat/route.ts` の `PERSONAL_CONTEXT` を編集：

```typescript
const PERSONAL_CONTEXT = `
You are an AI assistant representing...
{/* ここに自分の情報を入力 */}
`;
```

## 🚀 デプロイ

詳細なデプロイ手順は [DEPLOY.md](./DEPLOY.md) を参照してください。

### Vercel（推奨）

1. 上の「Deploy with Vercel」ボタンをクリック
2. GitHubリポジトリをVercelにインポート
3. 環境変数 `ANTHROPIC_API_KEY` を設定
4. デプロイ

### 手動デプロイ

```bash
# Vercel CLIをインストール
npm install -g vercel

# ログイン
vercel login

# デプロイ
vercel

# 本番環境にデプロイ
vercel --prod
```

## 📝 開発コマンド

```bash
# 開発サーバーを起動
npm run dev

# 本番ビルド
npm run build

# 本番サーバーを起動
npm run start

# リント
npm run lint

# 型チェック
npm run typecheck
```

## 🔧 環境変数

| 変数名 | 説明 | 必須 |
|--------|------|------|
| `ANTHROPIC_API_KEY` | Claude APIキー（チャットボット機能用） | ○ |

## 🌐 デモ

**GitHubリポジトリ**: https://github.com/ryoma373639/digital-namecard

**デプロイ後のURL**: https://digital-namecard-xyz.vercel.app

## 📸 機能説明

### プロフィールセクション
- アバター画像（グラデーション背景）
- 名前と肩書き
- 自己紹介文
- アニメーション効果

### SNSリンク
- Instagram
- X (Twitter)
- Threads
- ホバーエフェクト付き

### AIチャットボット
- Claude APIを使用
- リアルタイムチャット
- パーソナライズされた応答
- ローディングアニメーション

## 🤖 Miyabiフレームワーク

このプロジェクトは **Miyabi** フレームワークを使用しています。

詳細は元の [README.md](./README.md) を参照してください。

## 🤝 コントリビューション

コントリビューションを歓迎します！

1. このリポジトリをフォーク
2. 新しいブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

MIT License

## 🙏 謝辞

- [Next.js](https://nextjs.org/) - Reactフレームワーク
- [Tailwind CSS](https://tailwindcss.com/) - CSSフレームワーク
- [Anthropic](https://www.anthropic.com/) - Claude AI
- [Lucide](https://lucide.dev/) - アイコンライブラリ
- [Vercel](https://vercel.com/) - ホスティングプラットフォーム
- [Miyabi](https://github.com/ShunsukeHayashi/Miyabi) - AI駆動開発フレームワーク

## 📞 サポート

- GitHubで Issue を作成: https://github.com/ryoma373639/digital-namecard/issues
- デプロイガイド: [DEPLOY.md](./DEPLOY.md)
- Miyabiフレームワーク: [README.md](./README.md)

---

**🤖 このプロジェクトは [Claude Code](https://claude.com/claude-code) と Miyabi フレームワークを使用して自動生成されました。**

**開発時間**: 約30分（プロジェクトセットアップからデプロイ準備まで）

**特徴**:
- ✅ Next.js 14 + React 19 + TypeScript
- ✅ Tailwind CSS + レスポンシブデザイン
- ✅ Claude API統合
- ✅ Vercelデプロイ対応
- ✅ 完全なドキュメント

**デプロイ準備完了！** 🎉
