# Introdução ao React Native

#### 1. Inicializando um projeto

`$ npx react-native init NomeDoApp`

#### 2. Rodando no emulador/celular

`$ react-native run-android`

#### 3. Comandos úteis

**Instalar o react-native**

`$ npm i -g react-native`

**Iniciar o projeto**

`$ react-native start`

**Rodar no dispositivo**

`$ react-native run-android`

**Resetar cache do celular**

`$ react-native start --reset-cache`

#### 4. ESlint + Prettier

1. Deletar o arquivo .eslintrc e instalar o ESLint `$yarn add eslint -D`

Rodar o `$ yarn eslint --init`

? How would you like to use ESLint? **To check syntax, find problems, and enforce code style** <br/ >
? What type of modules does your project use? **JavaScript modules (import/export)** <br/ >
? Which framework does your project use? **React** <br/ >
? Does your project use TypeScript? **No** <br/ >
? Where does your code run? **NENHUM** <br/ >
? How would you like to define a style for your project? **Use a popular style guide** <br/ >
? Which style guide do you want to follow? **Airbnb: https://github.com/airbnb/javascript** <br/ >
? What format do you want your config file to be in? **JavaScript**

2. Instalar o prettier e demais dependências `$ yarn add prettier eslint-config-prettier eslint-plugin-prettier babel-eslint -D`

3. **Arquivo .eslintrc.js**

```js
module.exports = {
  env: {
    es6: true,
  },
  extends: [
    'airbnb',
    'prettier',
    'prettier/react'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    __DEV__: 'readonly'
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'prettier'
  ],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [
      'warn',
      { extensions: ['.jsx', '.js'] }
    ],
    'import/prefer-default-export': 'off',
  },
};
```

4. **Arquivo .prettierrc**

```json
{
  "singleQuote": true,
  "trailingComma": "es5"
}
```
