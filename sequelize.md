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
```
INSERT INTO Users (name, email)
  VALUES (
    "Leonardo Almeida",
    "leo@webid.net.br"
  )
```

#### Exemplo de JavaScript:
```
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
```
module.expots = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
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
    return queryInterface.dropTable('users')
  }
}
```
* É possível desfazer uma migração se errarmos algo enquanto estivermos desenvolvendo a feature;
* Depois que a migration foi enviada para outros devs ou para ambiente de produção, ela *JAMAIS* poderá ser alterada, uma nova deve ser criada;
* Cada migration deve realizar alterações em apenas uma tabela, você pode criar migrations para alterações maiores;