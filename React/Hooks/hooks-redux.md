# Utilizando os Hooks com Redux

### Connect -> useSelector

No Redux, é possível transformar propriedades como o `connect` em Hooks com o `useSelector`

**Antes, com o connect**
```js
import { connect } from 'react-redux';

// ...

export default connect(state => ({
  cartSize: state.cart.length,
}))(Header);
```

**Exemplo utilizando o useSelector**
```js
import { useSelector } from 'react-redux';

// ...

export default function Header() {
  const cartSize = useSelector(state => state.cart.length);

// ...
```

### dispatch -> useDispatch

**Antes, com o dispatch**
```js
function handleAddProduct(id) {
    addToCartRequest(id);
```

**Utilizando o useDispatch**
```js
// Importação do useDispatch
import { useDispatch } from 'react-redux'

// No escopo da função do componente
const dispatch = useDispatch();

// Adicionando o dispatch à função anterior
function handleAddProduct(id) {
    dispatch(CartActions.addToCartRequest(id));
```