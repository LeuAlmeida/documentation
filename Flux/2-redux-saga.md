# Redux Saga

## 1. Instalação

`$ yarn add redux-saga`

## 2. Modelo de Configuração

**Arquivo exemplo src/store/modules/cart/sagas.js**

```js
import { call, put, all, takeLatest } from 'redux-saga/effects';

import api from '../../../services/api';

import { addToCartSuccess } from './actions';

function* addToCart({ id }) {
  const response = yield call(api.get, `/products/${id}`);

  yield put(addToCartSuccess(response.data));
}

export default all([takeLatest('@cart/ADD_REQUEST', addToCart)]);
```

## 2. Arquivo de configuração do Redux

**Arquivo src/store/index.js**

```js
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const enhancer =
  process.env.NODE_ENV === 'development'
    ? compose(console.tron.createEnhancer(), applyMiddleware(sagaMiddleware))
    : applyMiddleware(sagaMiddleware);

const store = createStore(rootReducer, enhancer);

sagaMiddleware.run(rootSaga);

export default store;
```

## 3. Navegação

#### 3.1 History

Instalação

`$ yarn add history`

**Arquivo service/history.js**

```js
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export default history;
```

**Arquivo App.js**

A importação BrowserRouter vira apenas `Router`

```js
import { Router } from 'react-router-dom';
```

Importação da configuração de serviço do history

```js
import history from './services/history';
```

Substituição dos BrowserRouter por `router` passando o parâmetro history

```js
<Router history={history}>
...
</Router>
```