# 映画検索サイト

<img width="928" alt="image" src="https://github.com/user-attachments/assets/856e7d45-dcd0-444c-9ec9-af8a9cd10939">
<img width="926" alt="image" src="https://github.com/user-attachments/assets/b66865b5-6d37-4d7b-8e93-9e97b32a4679">


## 概要
このサイトでは、現在トレンド入りしている映画を確認・調べることができます。  
映画ごとの詳細情報（言語、カテゴリー、予告、あらすじ など）を確認でき、ユーザー登録をすることで、映画に評価を付けることも可能です。

## 技術構成
- **フロントエンド**: Nuxt.js (nuxt@3.13.1) / Vue.js、TypeScript  
- **バックエンド**: Node.js (v20.12.2) / Express (4.17.21)、MySQL (Ver 8.0.37)  
- **その他**: TypeORM (0.3.20)、Docker  

## 機能一覧
- **トレンド映画情報**:
- トレンド入り映画の確認  
- **映画詳細**: 
  - 映画の詳細情報を確認  
  - 予告の閲覧  
  - 関連映画の確認  
- **映画検索**:
- タイトルによるリアルタイム検索  
- **ユーザー機能**: 
  - 新規登録、ログイン、ログアウト  
- **評価機能**: 
  - 映画に1~5の星で評価  
  - 評価を付けた映画の一覧表示  

## レスポンシブ対応
- **スマートフォンサイズ**  
  ![スマートフォンサイズ](https://github.com/user-attachments/assets/a0f59069-b6e2-4c2b-9c1f-6371d4790a39)  
- **タブレットサイズ**  
  ![タブレットサイズ](https://github.com/user-attachments/assets/5da0cee1-f29d-4cc8-9c7a-7f35f40f6690)  

## 改善予定
- バックエンドをJava Spring Bootに書き直す（現在は途中まで）  
- カテゴリー別の映画表示機能の実装  
- プロファイルカスタマイズ機能（ユーザー情報変更、プロフィール写真の設定など）  
- 「見たい映画」リスト機能の追加  
- 星マークだけでなく、コメント付きの評価機能  
- グラフデータベース（JanusGraph）の導入によるユーザー間の共通点分析とおすすめ映画機能  
- コードのリファクタリング  
