# Estrutura do React

### Configurações iniciais

```powershell
$ yarn add @babel/core @babel/preset-env @babel/preset-react webpack webpack-cli -D
```

```powershell
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

**Arquivo webpack.config.sj**

Inserir o comando `devServer`:

```js
devServer: {
  contentBase: path.resolve(__dirname, 'public'),
},
```

#### Arquivo package.json

Inserir o script para o build da aplicação:
```json
"scripts": {
    "build": "webpack --mode development",
    "dev": "webpack-dev-server --mode development",
  },
```

#### Arquivo public/index.html

**Importação do arquivo bundle.js**

```html
<script src="./bundle.js"></script>
```

### Compilando CSS

```powershell
$ yarn add style-loader css-loader -D
```

**Arquivo webpack.config.js**

Criar uma nova *rule*:
```js
{
  test: /\.css$/,
  use: [
    { loader: 'style-loader' },
    { loader: 'css-loader' },
  ]
}
```

### Importação de imagens

```powershell
$ yarn add file-loader -D
```

**Arquivo webpack.config.js**

Criar uma nova *rule*:
```js
{
  test: /\.*\.(gif|png|jpe?g)$/i,
  use: {
    loader: 'file-loader'
  }
}
```

### Uso de estados da aplicação

Necessita da dependência `$ yarn add @babel/plugin-proposal-class-properties -D`

**Arquivo babel.config.js**

Adicionar os plugins:
```js
plugins: [
  '@babel/plugin-proposal-class-properties'
]
```

### Arquivo src/index.js

Geralmente possui a arquitetura abaixo.
```js
import React from 'react';
import { render } from 'react-dom'

import App from './App';

render(<App />, document.getElementById('app'));
```

### Arquivo src/App.js

É o componente que renderizará a aplicação. Exemplo:
```js
import React from 'react';
import './App.css';

import TechList from './components/TechList';

function App() {
  return <TechList />
}

export default App;
```

### Prop Types

Instalar a dependência `$ yarn add prop-types`

Importando dentro do componente
```js
import PropTypes from 'prop-types';
```

Definindo uma PropType
```js
TechItem.propTypes = {
  tech: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
}
```