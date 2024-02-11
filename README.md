# test_pj_for_amplify

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


---
## 以下は多分だけど

### デプロイするawsアカとかIAMユーザーのアクセスキーとかを設定する
```
amplify configure
amplify init
```

### Appsync(graphQL) + dynamoDB(Nosql) を設定する
```
amplify add api
-> graphql 
```

### backend(graphql) をデプロイ
```
amplify push
```

### amplify hosting を設定する
```
amplify add hosting
```

### frontend(vue) も含めてデプロイ
```
amplify publish
```