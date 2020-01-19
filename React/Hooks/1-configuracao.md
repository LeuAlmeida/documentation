# Introdução aos Hooks

### ESLInt para utilização dos React Hooks

**Instalação do plugin**

`$ yarn add eslint-plugin-react-hooks -D

**Arquivo .eslintrc**

Adicionar em `plugins` a linha *react-hooks* (depois do prettier):

```js
plugins: [
    'react',
    'prettier',
    'react-hooks'
  ],
```

Adicionar em `rules` as linhas:

```js
'react-hooks/rules-of-hooks': 'error',
'react-hooks/exhaustive-deps': 'warn'
```