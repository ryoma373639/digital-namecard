# デジタル名刺 - デプロイガイド

このドキュメントでは、デジタル名刺アプリケーションをVercelにデプロイする手順を説明します。

## 🚀 Vercelへのデプロイ手順

### 方法1: Vercel CLI（推奨）

1. **Vercel CLIをインストール**
   ```bash
   npm install -g vercel
   ```

2. **Vercelにログイン**
   ```bash
   vercel login
   ```

3. **プロジェクトをデプロイ**
   ```bash
   cd /Users/nishitanitoshihiko/Downloads/digital-namecard
   vercel
   ```

4. **環境変数を設定**
   ```bash
   vercel env add ANTHROPIC_API_KEY
   ```

   プロンプトが表示されたら、Anthropic APIキーを入力してください。
   - 取得先: https://console.anthropic.com/

5. **本番環境にデプロイ**
   ```bash
   vercel --prod
   ```

### 方法2: Vercel Web UI（簡単）

1. **Vercelにサインアップ/ログイン**
   - https://vercel.com/ にアクセス
   - GitHubアカウントでログイン

2. **新しいプロジェクトをインポート**
   - 「New Project」ボタンをクリック
   - GitHubリポジトリ「ryoma373639/digital-namecard」を選択

3. **環境変数を設定**
   - 「Environment Variables」セクションで以下を追加：
     - Key: `ANTHROPIC_API_KEY`
     - Value: あなたのAnthropic APIキー
     - Environment: Production, Preview, Development（全て選択）

4. **デプロイ**
   - 「Deploy」ボタンをクリック
   - 数分でデプロイが完了します

### 方法3: GitHub Actions（自動デプロイ）

GitHubにプッシュすると自動的にVercelにデプロイされます（Vercel GitHubアプリをインストール済みの場合）。

## 🔧 環境変数の設定

### 必須の環境変数

| 変数名 | 説明 | 取得方法 |
|--------|------|----------|
| `ANTHROPIC_API_KEY` | Claude APIキー | https://console.anthropic.com/ |

### Vercel Webでの環境変数設定

1. Vercelダッシュボードでプロジェクトを選択
2. 「Settings」 → 「Environment Variables」に移動
3. 「Add」ボタンをクリック
4. Key: `ANTHROPIC_API_KEY`
5. Value: あなたのAPIキー
6. Environment: Production, Preview, Development を選択
7. 「Save」をクリック

### Vercel CLIでの環境変数設定

```bash
# 本番環境用
vercel env add ANTHROPIC_API_KEY production

# プレビュー環境用
vercel env add ANTHROPIC_API_KEY preview

# 開発環境用
vercel env add ANTHROPIC_API_KEY development
```

## 📝 デプロイ後の確認

デプロイが完了したら、以下を確認してください：

1. **アプリケーションにアクセス**
   - Vercelが提供するURLにアクセス（例: `https://digital-namecard-xyz.vercel.app`）

2. **プロフィールセクションの確認**
   - 写真、名前、自己紹介が正しく表示されているか

3. **SNSリンクの確認**
   - Instagram、X、Threadsのリンクが動作するか

4. **AIチャットボットの確認**
   - 「Chat with AI」ボタンをクリック
   - メッセージを送信してClaude APIが動作するか確認

## 🎨 カスタマイズ

### プロフィール情報の変更

`app/page.tsx` ファイルを編集：

```tsx
<h1 className="...">
  Your Name  {/* ← ここを変更 */}
</h1>
<p className="...">
  Professional Title / Role  {/* ← ここを変更 */}
</p>
<p className="...">
  Welcome to my digital namecard! ...  {/* ← ここを変更 */}
</p>
```

### SNSリンクの変更

`app/page.tsx` ファイルを編集：

```tsx
<a href="https://instagram.com/yourusername" ...>
  {/* ← ここを変更 */}
</a>
```

### AIアシスタントのコンテキスト変更

`app/api/chat/route.ts` ファイルの `PERSONAL_CONTEXT` を編集：

```typescript
const PERSONAL_CONTEXT = `
You are an AI assistant representing a professional individual...
{/* ここを自分の情報に変更 */}
`;
```

### カラーテーマの変更

`tailwind.config.js` ファイルで色を変更：

```javascript
colors: {
  primary: {
    500: '#0ea5e9',  // メインカラー
    // ...
  },
},
```

## 🔄 再デプロイ

変更を加えた後、再デプロイする方法：

### Vercel CLI

```bash
git add .
git commit -m "Update profile information"
git push origin main
vercel --prod
```

### Vercel Web UI（自動）

GitHubにプッシュするだけで自動的に再デプロイされます：

```bash
git add .
git commit -m "Update profile information"
git push origin main
```

## 🌐 カスタムドメインの設定

1. Vercelダッシュボードでプロジェクトを選択
2. 「Settings」 → 「Domains」に移動
3. カスタムドメインを追加
4. DNSレコードを設定（Vercelが指示を表示）

## 📊 パフォーマンス最適化

- **画像最適化**: Next.js Image コンポーネントを使用（既に実装済み）
- **コード分割**: Next.js App Routerが自動的に実行
- **キャッシング**: Vercel Edgeネットワークが自動的に実行

## 🐛 トラブルシューティング

### エラー: "ANTHROPIC_API_KEY is not defined"

**原因**: 環境変数が設定されていない

**解決策**:
1. Vercelダッシュボードで環境変数を確認
2. `ANTHROPIC_API_KEY` が正しく設定されているか確認
3. 再デプロイ

### エラー: "Failed to compile"

**原因**: TypeScriptエラー

**解決策**:
```bash
npm run typecheck
```

### エラー: "Deployment failed"

**原因**: ビルドエラー

**解決策**:
```bash
npm run build
```
ローカルでビルドして問題を特定

## 📞 サポート

問題が発生した場合：

1. GitHubリポジトリでIssueを作成: https://github.com/ryoma373639/digital-namecard/issues
2. Vercelドキュメント: https://vercel.com/docs
3. Next.jsドキュメント: https://nextjs.org/docs

---

🎉 **デプロイ完了おめでとうございます！**

あなたのデジタル名刺が世界中からアクセス可能になりました！
