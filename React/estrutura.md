# Estrutura do React

### Configurações iniciais

```console
$ yarn add @babel/core @babel/preset-env @babel/preset-react webpack webpack-cli -D
```

```console
$ yarn add react react-dom
```

#### Arquivo babel.config.js

```js
module.exports = {
  presets: [
    "@babel/preset-env",
    "@babel/preset-react",
  ],
}
```
#### Arquivo webpack.config.js

Instalar o babel-loader como dependência de desenvolvimento: `$ yarn add babel-loader -D`

```js
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  }
};
```

### Webpack Dev Server

Instalar o pacote `$ yarn add webpack-dev-server -D `

#### Arquivo package.json

Inserir o script para o build da aplicação:
```json
"scripts": {
    "build": "webpack --mode development",
    "dev": "webpack-dev-server --mode development",
  },
```

Rodar o build do webpack: `$ yarn dev`

#### Arquivo public/index.html

**Importação do arquivo bundle.js**

```html
<script src="./bundle.js"></script>
```