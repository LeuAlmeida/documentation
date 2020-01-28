# .ENV

#### 1. Arquivo dot env

É um arquivo de variáveis ambientes, deve conter todas as informações que podem sofrer variações conforme mudar de ambiente de produção para desenvolvimento, servidores de outros devs, etc.

**Exemplo do arquivo .env:**

```zsh
# Auth

APP_SECRET=gobarberrocketseatleualmeida

# Database

DB_HOST=localhost
DB_USER=postgres
DB_PASS=docker
DB_NAME=gobarber

# Mongo

MONGO_URL=mongodb://localhost:27017/gobarber

```

#### 2. Setando as variáveis

Instalar o pacote `$ yarn add dotenv`

**Arquivo src/app.js** e **src/queue.js**

```js
// Importar o pacote
import 'dotenv/config';
```

**Arquivo src/config/database.js**

```js
// Importar o pacote
require('dotenv/config');
```

#### 3. Utilizando as variáveis ambientes

**Antes:**

```js
url: {
  type: Sequelize.VIRTUAL,
  get() {
    return `http://localhost:3333/files/${this.path}`;
  },
},
```

**Depois:**

```js
url: {
    type: Sequelize.VIRTUAL,
    get() {
      return `${process.env.APP_URL}/files/${this.path}`;
    },
  },
},
```