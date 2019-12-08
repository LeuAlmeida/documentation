# Reactotron

#### 1. Instalação

**Instalação da versão desktop:**

https://github.com/infinitered/reactotron/releases

**Instalação no projeto**

`$ yarn add reactotron-react-native`

#### 2. Configuração

**Arquivo src/config/ReactotronConfig.js**

```js
import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  const tron = Reactotron.configure()
    .useReactNative()
    .connect();

  console.tron = tron;

  tron.clear(); // Não obrigatório
}
```

#### 3. Prevenção contra erros

Caso não haja atividade, uma solução é rodar novamente o `$ react-native start --reset-cache` juntamente com o `$ adb reverse tcp:9090 tcp:9090`