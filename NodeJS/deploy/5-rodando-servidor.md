# Rodando o Servidor

### Gerando a build da aplicação

1. No arquivo **package.json** (em ambiente de desenvolvimento, fora do servidor) deve-se adicionar os scripts *build* e *start*:

```json
{
  // ...
  "scripts": {
    "dev": "nodemon src/server.js",
    "build": "sucrase ./src -d ./dist --transforms import",
    "start": "node dist/server.js"
  },
  // ...
}
```

2. Testar executando o comando `$ yarn build` no ambiente de desenvolvimento

3. Adicionar a pasta **dist** no arquivo `.gitignore`

4. Dar um `$ git push` no ambiente de desenvolvimento e um `$ git pull` no ambiente de produção.

### Firewall do Servidor

Para acessar a porta requisitada, é necessário Liberando a porta utlizada na aplicação rodando o comando:

```
$ sudo ufw allow 3333
```

### Sequelize

Os comandos para executar migrations e seeders do Sequelize em ambiente de produção utilizam o **NPX**. 

Exemplo:

`$ npx sequelize db:migrate`