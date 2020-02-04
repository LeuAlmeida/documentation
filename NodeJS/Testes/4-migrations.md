# Testes de Migrations

Após criar as migrations normalmente pelo Sequelize, deve-se acrescentar alguns scripts:

**Arquivo package.json**
```json
"scripts": {
// ...
"pretest": "NODE_ENV=test sequelize db:migrate", // Script que rodará antes do teste
"test": "NODE_ENV=test jest",
"posttest": "NODE_ENV=test sequelize db:migrate:undo:all" // Script que rodará após o teste
}
```