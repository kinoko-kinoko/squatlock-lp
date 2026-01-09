# ABテスト技術仕様書（GA4担当向け）

## 概要

SquatLock LPにCTAボタンのABテストを実装しました。GA4でのトラッキング設定をお願いします。

---

## 実験詳細

| 項目 | 値 |
|------|-----|
| **実験ID** | `cta_button_v1` |
| **対象** | ヒーローセクションのCTAボタン |
| **バリアントA** | 緑背景・英語（Download on the App Store） |
| **バリアントB** | 白背景・英語（100% Free / Download Now） |
| **振り分け** | 50/50（ランダム、LocalStorage保存で一貫性維持） |

---

## dataLayerイベント

### 1. ページ読み込み時（振り分け通知）

```javascript
dataLayer.push({
  event: 'ab_test',
  experiment_id: 'cta_button_v1',
  variant: 'A' // or 'B'
});
```

### 2. CTAクリック時（コンバージョン）

```javascript
dataLayer.push({
  event: 'cta_click',
  experiment_id: 'cta_button_v1',
  variant: 'A', // or 'B'
  click_location: 'Hero Primary'
});
```

---

## GA4で必要な設定

### カスタムディメンション

1. **GA4管理** → **カスタム定義** → **カスタムディメンションを作成**
2. 以下を追加：
   - `experiment_id`（イベントスコープ）
   - `variant`（イベントスコープ）

### GTMトリガー設定

1. **ab_test** イベントのトリガー作成
2. **cta_click** イベントのトリガー作成
3. 各トリガーでGA4イベントタグを発火

### 分析レポート

**GA4探索レポート**で以下を比較：
- バリアントA vs B の `cta_click` 発生率
- バリアント別のセッション数

---

## 動作確認方法

1. https://squatlock.saki-paru.com/ にアクセス
2. ブラウザDevTools → Console で `dataLayer` を入力
3. `ab_test` イベントと `variant` 値を確認
4. CTAボタンをクリックして `cta_click` イベントを確認
