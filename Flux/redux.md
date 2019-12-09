# Redux

## 1. Conceitos

#### 1.1 O que é Redux?

* Biblioteca que implementa a Arquitetura Flux;
* Controle de estados globais;
* Quando utilizar o Redux?
  * Meu estado tem mais de um "dono"?
  * Meu estado é manipulado por mais componentes?
  * As ações do usuário causam efeitos colaterais nos dados?
* Exemplos: Carrinho de compras, dados do usuário, player de música, etc;

#### 1.2 Arquitetura Flux

Exemplo gráfico

**CATÁLOGO** -> Action

Exemplo da Action:

```js
{
  type: "ADD_TO_CART",
  product: { ... }
}
```

Action -> Redux Store (Reducers) -> Mutação no estado

#### 1.3 Princípios

* Toda action deve possuir um *type*;
* O estado do Redux é o único ponto de verdade;
* Não podemos *mutar o estado do Redux sem uma action*;
* As actions e reducers são funções puras, ou seja, *não lidam com side-effects assíncronos*;
* Qualquer lógica síncrona para regras de negócio *deve ficar no reducer e nunca na action*;
* **Nem toda aplicação precisa do Redux, inicie sem ele e sinta a necessidade depois**;

## 2. Uso do Redux

#### 2.1 Instalação

Instalação do Redux no React
`$ yarn add redux react-redux`

#### 2.2 Configuração

**Arquivo /src/store/index.js**

```js
import { createStore } from 'redux';

const store = createStore();

export default store;
```

**Arquivo src/App.js**

Importação do *Provider* do *react-redux* e do método *store criado anteriormente*

```js
import { Provider } from 'react-redux';

import store from './store';
```

Envolver todos os componentes com o método *Provider* passando o atributo *store*

```js
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes />
        <GlobalStyle />
      </BrowserRouter>
    </Provider>
  );
}
```

**ATENÇÃO!**

O arquivo src/store/index.js necessita de um reducer para funcionar.

**Criação do Reducer em src/store/modules/cart/reducer.js**

```js
export default function cart() {
  return [];
}
```

**Exemplo do arquivo store com com um Reducer**

```js
import { createStore } from 'redux';

import reducer from './modules/cart/reducer';

const store = createStore(reducer);

export default store;
```

#### 2.3 Múltiplos reducers

**Arquivo src/store/modules/rootReducer.js**

```js
import { combineReducers } from 'redux';

import cart from './cart/reducer';

export default combineReducers({
  cart,
});
```

**Arquivo src/store/index.js**

```js
import { createStore } from 'redux';

import rootReducer from './modules/rootReducer';

const store = createStore(rootReducer);

export default store;
```

## 3. Conexões e Uso Prático

#### 3.1 Importação em uma página com componentes

Importação do connect do react-redux

```js
import { connect } from 'react-redux';
```

**Novo modelo de exportação**

```js
export default connect()(Home);
```

#### 3.2 Adicionando uma action em um componente

**O botão:**

```js
<button
  type="button"
  onClick={() => this.handleAddProduct(product)}
>
```

**A função handleAddProduct():**

```js
handleAddProduct = product => {
  const { dispatch } = this.props;

  dispatch({
    type: 'ADD_TO_CART',          // O dispatch é quem dispara a função e é acessível graças ao connect
    product,
  });
};
```

**O reducer:**

```js
export default function cart(state = [], action) {  // Estado inicial e a ação executada como parâmetro
  
  switch (action.type) {
    case 'ADD_TO_CART':                     // Reducer sendo chamado apenas caso seja o ADD_TO_CART
      return [...state, action.product];    // Retornando o estado inicial + o produto chamado naquela action
    default:                
      return state;                         // Reducer ignorando outras actions que não sejam pertinentes
  }
}
```

#### 3.3 Recebendo estado de outros componentes

Exemplo de um cabeçalho de e-commerce. <br/>

Importação do *connect*

```js
import { connect } from 'react-redux';
```

Passando um objeto na função para conectá-lo com o componente

```js
function Header({ cart }) {
  return (
    ...
  )
}
```

Exportar com o connect passando o estado como um objeto

```js
export default connect(state => ({ 
  cart: state.cart,         // O cart de "state.cart" é o cart declarado no rootReducer
}))(Header);
```