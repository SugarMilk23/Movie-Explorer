# 映画検索サイト

<img width="928" alt="image" src="https://github.com/user-attachments/assets/856e7d45-dcd0-444c-9ec9-af8a9cd10939">
<img width="926" alt="image" src="https://github.com/user-attachments/assets/b66865b5-6d37-4d7b-8e93-9e97b32a4679">

- **ログインしてから使えるサイドバー**  
  ![ログインしてから使えるサイドバー](https://github.com/user-attachments/assets/7eb18320-e09d-4f3a-a130-9d0d043ef7c8)


- **星評価をつけた映画の履歴**  
  ![星評価をつけた映画の履歴](https://github.com/user-attachments/assets/d1abd50f-7f7a-413e-a32a-316511a821ef)




## 概要
このサイトでは、現在トレンド入りしている映画を確認・調べることができます。  
映画ごとの詳細情報（言語、カテゴリー、予告、あらすじ など）を確認でき、ユーザー登録をすることで、映画に評価を付けることも可能です。

## 技術構成
- **フロントエンド**: Nuxt.js (nuxt@3.13.1) / Vue.js、TypeScript  
- **バックエンド**: Node.js (v20.12.2) / Express (4.17.21)、MySQL (Ver 8.0.37)  
- **その他**: TypeORM (0.3.20)、Docker、AWS

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

 - **サイドバー**
   -ログインしてから使えるページ遷移

## レスポンシブ対応
- **スマートフォンサイズ**  
  ![スマートフォンサイズ](https://github.com/user-attachments/assets/a0f59069-b6e2-4c2b-9c1f-6371d4790a39)  
- **タブレットサイズ**  
  ![タブレットサイズ](https://github.com/user-attachments/assets/5da0cee1-f29d-4cc8-9c7a-7f35f40f6690)  

## デプロイ環境
- フロントエンドとAPIはRenderの Web Serviceに
- データベースは、開発の時はローカルのDockerコンテナーで動かしていましたが、デプロイの時はAWSのRDSにしました。

## 難航した部分
- 無料のウェブホスティングサービスは多々あるが、静的サイトしか使えないのがほとんですので、動的サイトを無料でデプロイできるホスティングサービスを探すのに苦労したこと
- AWSがわからな過ぎて設定と接続に時間がかかったこと
- ローカル環境では問題がなかったのに、デプロイした時にエラーが大量発生したこと（主にはデータのフェッチに関連）
- ページ遷移した後にまた戻ってきても、入力した検索キーワードや現在閲覧中のページなどの状態を保持することと、検索キーワードを入力するたびに、現在閲覧中のページを1ページ目に戻るようにするための矛盾解消（検索バーのキーワードはwatchを使って、変化するたびに自動的にデータをフェッチして、閲覧中のページを1ページ目にしてくれますが、ページ遷移する時には一旦検索バーの内容をsessionストレージに保存して、戻って来た時に、検索バーにその内容を入れるようにしています。そうなると、watchが作動してまたデータをフェッチし、1ページ目にもどるようになり、状態保持ができません。Piniaを使って状態をグローバル管理もしてみましたが、Piniaで管理した場合、内容に変化があってもwatchが作動しないという問題があったので諦めました。）。
- 少し修正しただけでもレイアウトが崩れること

- etc

## 改善予定
- バックエンドをJava Spring Bootに書き直すこと（現在は途中まで）  
- カテゴリー別の映画表示機能の実装
- Google、Facebook、Twitter(X)でユーザー登録、ログインする機能の実装
- プロファイルカスタマイズ機能（ユーザー情報変更、プロフィール写真の設定など）  
- 「見たい映画」リスト機能の追加  
- 星マークだけでなく、コメント付きの評価機能  
- グラフデータベース（JanusGraph）の導入によるユーザー間の共通点分析とおすすめ映画機能  
- コードのリファクタリング  
