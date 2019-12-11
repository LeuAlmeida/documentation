# Redux Saga

#### 1. Instalação

`$ yarn add redux-saga`

#### 2. Modelo de Configuração

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