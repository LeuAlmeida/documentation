# Async Storage

#### 1. Instalação

`$ yarn add @react-native-community/async-storage`

#### 2. Exemplo de armazenamento

Importação:

```js
import AsyncStorage from '@react-native-community/async-storage';
```

Modelo de armazenamento no Async Storage:

```js

async componentDidMount() {
    const users = await AsyncStorage.getItem('users');

    if (users) {
      this.setState({ users: JSON.parse(users) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { users } = this.state;

    if (prevState.users !== users) {
      AsyncStorage.setItem('users', JSON.stringify(users));
    }
  }
```