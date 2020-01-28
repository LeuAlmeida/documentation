# Introdução ao Sequelize

### ORM
* Abstração do banco de dados;
* Tabelas viram models
  * users :arrow_right: User.js
  * companies :arrow_right: Company.js
  * projects :arrow_right: Project.js

### Manipulação dos Dados
* Sem SQL *(na maioria das vezes)*;
* Apenas código JavaScript;

#### Exemplo de SQL:
```sql
INSERT INTO Users (name, email)
  VALUES (
    "Leonardo Almeida",
    "leo@webid.net.br"
  )
```

#### Exemplo de JavaScript:
```js
  User.create({
    name: 'Leonardo ALmeida',
    email: 'leo@webid.net.br',
  })
  ```

### Migrations
* Controle de versão para base de dados;
* Cada arquvo contém instruções para criação, alteração ou remoção de tabelas ou colunas;
* Mantém a base atualizada entre todos desenvolvedores do time e também no ambiente de produção;
* Cada arquivo é uma migration e sua ordenação ocorre por data
* :warning: A partir do momento em que a migration for passada para outro(s) desenvolvedor(es) ou para o ambiente de produção, ela não deve mais ser editada. Para isso, cria-se novas migrations.

#### Exemplo de migration:
```js
module.expots = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', { // Introdução para criar uma nova tabela.
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {                                   // Criação do primeiro campo com suas prioridades.
        allowNull: false,                       // O ID é a chave primária e auto incremental.
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users')    // Instrução para deletar a tabela caso haja um rollback.
  }
}
```
* É possível desfazer uma migração se errarmos algo enquanto estivermos desenvolvendo a feature;
* Depois que a migration foi enviada para outros devs ou para ambiente de produção, ela *JAMAIS* poderá ser alterada, uma nova deve ser criada;
* Cada migration deve realizar alterações em apenas uma tabela, você pode criar migrations para alterações maiores;

### Seeds
* População da base de dados para desenvolvimento;
* Muito utilizado para popular dados para testes;
* Executável apenas por código;
* Jamais será utilizado em produção;
* Caso sejam dados que precisam ir para produção, a própria migration pode manipular dados das tabelas;

### Arquitetura MVC
* Model
  * O model armazena a abstração do banco, utilizado para manipular os dados contidos nas tabelas do banco. Não possuem responsabilidade sobre a regra de negócio da nossa aplicação
* Controller
  * O controller é o ponto de entrada das requisições da nossa aplicação, uma rota geralmente está associada diretamente com um método do controller. Podemos incluir a grande parte das regras de negócio da aplicação nos controllers (conforme a aplicação cresce podemos isolar as regras).
* View
  * A view é o retorno ao cliente, em aplicações que não utilizando o modelo de API REST isso pode ser um HTML, mas no nosso caso, a view é apenas nosso *JSON* que será retornado ao front-end e depois manipulado pelo *ReactJS* ou *React Native*

  #### A face de um Controller
* Classes;
* Sempre retorna um JSON;
* Não chama outro controller/método;
* Quando criar um novo Controller:
  * Apenas 5 métodos;
  * Estou falando da mesma *entidade*?

##### Métodos:

```js
class UserController {
  index() { }   // Listagem de usuários
  show() { }    // Exibir um único usuário
  store() { }   // Cadastrar usuário
  update() { }  // Alterar usuário
  delete() { }  // Remover usuário
}
```

# Instalação do Sequelize

### Postgres + Sequelize
`yarn add sequelize` e `yarn add sequelize-cli -D` instalará as dependências necessárias para rodar o Sequelize

`yarn add pg pg-hstore` essas duas dependências são necessárias para integrar o Sequelize com o Postgres

### Configurações do Postgres
*src/config/database.js*

```js
module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'gobarber',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
```

### Configurações do Sequelize
*Arquivo .sequelizerc*

```js
const { resolve } = require('path');

module.exports = {
  config:resolve(__dirname, 'src', 'config', 'database.js'),
  'models-path':resolve(__dirname, 'src', 'app', 'models'),
  'migrations-path':resolve(__dirname, 'src', 'database', 'migrations'),
  'seeders-path':resolve(__dirname, 'src', 'database', 'seeds'),
}
```

### Criando e rodando uma migration com o Sequelize
`yarn sequelize-cli migration:create --name=create-users` irá criar uma migration com o nome *create-users* de forma pré-definida.

`yarn sequelize db:migrate` serve para gerar esse banco de dados

`yarn sequelize db:migrate:undo` para dar *undo* na última migration ou `yarn sequelize db:migrate:undo:all` para dar undo em todas as migrations

### Criação de uma Model
*src/app/models/User.js*

Modelo de Exemplo:

```js
import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(  // O primeiro parâmetro são os valores que o usuário pode receber no momento de criação ou edição
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize, // O segundo parâmetro é o sequelize passado no init, mas poderia ser passadas outras configurações.
      }
    );
  }
}

export default User;
```

**Arquivo src/database/index.js**

```js
import Sequelize from 'sequelize';

import User from '../app/models/User';

import databaseConfig from '../config/database';

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
```