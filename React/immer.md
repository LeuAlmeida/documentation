# Immer

https://github.com/immerjs/immer

#### 1. Instalação

`$ yarn add immer`

#### 2. Uso prático

**Exemplo de uso em src/modules/cart/reducer.js**

```js
import produce from 'immer';

export default function cart(state = [], action) {
  switch (action.type) {
    case 'ADD_TO_CART':

      // Cria um rascunho em cima da ação enviada
      return produce(state, draft => {
        // Procura uma action que já tenha sido disparada
        const productIndex = draft.findIndex(p => p.id === action.product.id);

        // Caso já tenha sido disparada, acrescenta +1 ao amount do produto estimado anteriormente
        if (productIndex >= 0) {
          draft[productIndex].amount += 1;
        } else {
          draft.push({

            // Caso contrário, adiciona todo o item no estado
            ...action.product,
            amount: 1,
          });
        }
      });
    default:
      return state;
  }
}

```

