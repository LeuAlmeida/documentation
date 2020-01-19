# Uso do hook useState

### Explicação

Este Hook possibilita a criação de estados em *componentes funcionais*.

### Exemplo de Uso

```js
import React, { useState } from 'react';

// ...

const [tech, setTech] = useState([
    'ReactJS',
    'React Native',
    'Node.JS'
  ]);
// No array:
// Primeira posição = Estado
// Segunda posição = Função para atualizar as informações do estado

// ...
```