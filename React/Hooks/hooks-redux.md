# Utilizando os Hooks com Redux

No Redux, é possível transformar propriedades como o `connect` em Hooks com o `useSelector`

**Exemplo utilizando o connect**
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