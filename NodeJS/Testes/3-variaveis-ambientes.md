# Variáveis Ambientes + Testes

**Arquivo .env.test**

```shell
APP_URL=http://localhost:3333
NODE_ENV=development

# Auth
APP_SECRET=templatenoderocketseat

# Database
DB_DIALECT=sqlite
```

**Arquivo src/config/database.js**
```js
require('dotenv/config');

module.exports = {
  dialect: process.env.DB_DIALECT || 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  storage: './__tests__/database.sqlite',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
```

**Arquivo src/bootstrap.js**
```js
import dotenv from 'dotenv';

dotenv.config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });
```

**Arquivos que importam o 'dotenv/config'**

```js
import './bootstrap';
// ...
```

**Arquivo package.json**

Alterar o script `teste`:

```json
"scripts": {
  // ...
  "test": "NODE_ENV=test jest"
}
```