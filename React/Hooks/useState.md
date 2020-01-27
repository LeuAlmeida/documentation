# Uso do hook useState

### Explicação

Este Hook possibilita a criação de estados em *componentes funcionais*.

### Exemplo de useState

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

### Exemplo de setState

```js
function handleAdd() {
  setTech([...tech, 'Node.js']); // Função que seta o estado de Techs
}                                // com o estado anterior (...techs) + a tecnologia Node.js

// ...

  <button type="button" onClick={handleAdd}> { /* Chama a função de adicionar tecnologia ao clicar */ }
    Adicionar
  </button>
```