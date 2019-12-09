# Polished

#### 1. O que é

Pacote que lida com cores no JavaScript

#### 2. Instalação

`$ yarn add polished`

#### 3. Uso para escurecimento

Exemplo de um styled component

**Importação**

```js
import { darken } from 'polished';
```

**O uso**

```js
&:hover {
  background: ${darken(0.03, '#7159c1')};
}
```