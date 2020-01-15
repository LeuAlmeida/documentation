# MongoDB

#### Criação de um cluster

É necessário criar um novo projeto e na sequência um novo cluster para obter o acesso gratuito (em projetos pequenos).

#### Criação de um usuário

Security -> Database Access -> ADD NEW USER --> Criar um nome de usuário e senha -> Read and write to any database -> Add User

#### Acessos Externos

Security -> Network Access -> ADD IP ADDRESS

### Conectando a aplicação

Atlas -> Clusters -> Connect -> Connect Your Application -> Node.js -> 3.0 or later -> Copiar o código disponibilizado -> Seguir os próximos passos no código JavaScript

```js
mongoose.connect('Código do MongoDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.json())
```

### Verificação de porta:

http://portquiz.net:27017 (porta do MongoDB)