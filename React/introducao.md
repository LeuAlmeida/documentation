# Introdução ao React

### O que é React?
* Biblioteca para construção de interfaces;
* Utilizado para construção de SPA (Single-Page Applications);
* Podemos chamar de framework? **SIM**
* Tudo fica dentro do JavaScript
* React
  * Biblioteca React de modo geral
* ReactJS
  * Biblioteca React para web, utilizando React-DOM
* React Native
  * Biblioteca React para mobile, utilizando recursos nativos

**Exemplo:**

```js
import React from 'react';

import './button.css';
import icon from './button.png';

function Button() {
  return (
    <button>
      <img src={icon} />
    <button>
  )
}
```