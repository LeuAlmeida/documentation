# useEffect

O useEffect é um efeito a ser executado em determinado momento do ciclo de vida da aplicação. Ele é escrito da seguinte forma:

```js
useEffect(() => {}, []);

// Explicação:
// () => {} é uma função que será executada
// [] é o array que determina quando esse useEffect deve ser executado
```

```js
import React, { useEffect } from 'react'

// ...

function App() {
  // ...

  useEffect(() => {}, [])

  // ...
}