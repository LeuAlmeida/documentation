# React Navigation

#### 1. Instalação

`$ yarn add react-navigation`

**IMPORTANTE:**

1. Instalar as dependências exigidas na documentação (há diferença de dependências entre **com** e **sem** o Expo)

https://reactnavigation.org/docs/en/getting-started.html

2. Modificar os arquivos `android/app/build.gradle` e `MainActivity.java` conforme orientado na documentação

3. Rodar novamente o projeto com `$ react-navite run-android`

#### 2. Configuração

##### 2.1 Navegação por Stack

Instalação do `$ yarn add react-navigation-stack`

**Arquivo src/routes.js**

Exemplo:

```js
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import User from './pages/User';

const Routes = createAppContainer(
  createStackNavigator({
    Main,
    User,
  })
);

export default Routes;
```

**Arquivo src/index.js**

Exemplo da importação da navegação:

```js
import React from 'react';
import { View } from 'react-native';

// import { Container } from './styles';

export default function Main() {
  return <View />;
}

Main.navigationOptions = {
  title: 'Usuários', // Cabeçalho do componente
}; 

```