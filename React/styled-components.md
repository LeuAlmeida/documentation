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

#### 3. Estilização Global

**Arquivo src/styles/global.js**

```js
import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
 * {
   margin: 0;
   padding: 0;
   outline: 0;
   box-sizing: border-box;
 }

 html, body, #root {
   min-height: 100%;
 }

 body {
   background: #7159c1;
   -webkit-font-smoothing: antialiased !important;
 }
`;
```

**Arquivo src/App.js**

```js
import React from 'react';

import Routes from './routes';
import GlobalStyle from './styles/global';

function App() {
  return (
    <>
      <Routes />
      <GlobalStyle />
    </>
  );
}

export default App;
```

#### 4. Acessando as propriedades de um objeto

Exemplo de uso:

```js
export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
```

#### 5. Keyframes e variáveis

**Importação**

```js
import styled, { keyframes, css } from 'styled-components';
```

**Uso do keyframe**

```js
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;
```

**Uso de variáveis**

```js
${props =>
props.loading &&
css`
  svg {
    animation: ${rotate} 2s linear infinite;
  }
`}
```

#### 6. Seletores do Styled Components

**Adicionar estilização em todos os elementos, exceto no primeiro**

Exemplo:

```js
export const List = styled.ul`
  list-style: none;
  margin-top: 30px;

  li {
    padding: 15px 0;

    & + li {
    ... Toda estilização que ocorrer aqui dentro não acontecerá no primeiro elemento LI
    }
  }  
`
```