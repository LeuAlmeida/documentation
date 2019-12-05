# Styled Components

#### 1. Instalação

```console
$ yarn add styled-components
```

**Exemplo do arquivo styles.js**

```js
import styled from 'styled-components';

export const Title = styled.h1`
  font-size: 24px;
  color: #7159c1;
  font-family: Arial, Helvetica, sans-serif;
`;
```

**Exemplo de uso**

```js
import React from 'react';

import { Title } from './styles';

export default function Main() {
  return <Title>Main</Title>;
}
```

#### 2. Função baseada em propriedades

**Arquivo styles.js**

Caso haja a propriedade "Erro" dentro da tag, retornará uma condicional ternário para cores.

```js
color: ${props => (props.error ? 'red' : '#7159c1')};
```