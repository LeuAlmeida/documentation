# Passos para insatalação

### Preparando o ambiente

```console
$ yarn create react-app NOMEDOAPP
```

**Remoção do eslint no package.json**

```json
 "eslintConfig": {
    "extends": "react-app"
  },
```

**Remoção do manifest.json no index.html**

```html
<link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
```

**Estrutura final de pastas**

*public
  *favicon.ico
  *index.html
