# Prettier

#### 1. Instalação

```console
yarn add prettier eslint-config-prettier eslint-plugin-prettier -D
```

#### 2. Arquivo .prettierc

```json
{
  "singleQuote": true,
  "trailingComma": "es5"
}
```

#### Arquivo .eslintrc

Corrigir e adicionar as linhas:

```js
extends: [
  'airbnb-base',
  'prettier'
],
plugins: ['prettier'],
  ```