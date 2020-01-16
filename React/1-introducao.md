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

### Vantagens

* Organização do código;
  * Componentização;
* Divisão de responsabilidaeds;
  * Back-end: Regra de negócio
  * Front-end: Interface
* Uma API, múltiplos clientes;
* Programação declarativa;

### JSX

* Escrever HTML dentro do JavaScript;
* Com React podemos criar nossos próprios elementos

### Babel / Webpack

* O browser não entende todo esse código;
* O Babel converte o código JS de uma forma que o browser entenda;
* O Webpack possui várias funções:
  * Criação do bundle, arquivo com todo código da aplicação;
  * Ensinar ao JavaScript como importar arquivos CSS, imagens e etc;
  Live reload com Webpack Dev Server