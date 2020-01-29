# Bcrypt
### Criando hash de senha

```js
$ yarn add bcryptjs
```

1. Importar o bcrypt no model `import bcrypt from 'bcryptjs'`
2. Inserir o campo password utilizando **Sequelize.VIRTUAL** (este campo nunca estará presente no banco de dados, por ser virtual).
3. Criar hook para que antes de ser salvo, criar um hash na senha.

Exemplo **Model de Usuário**:

```js
import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }
}

export default User;

```