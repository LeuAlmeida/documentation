# Axios

#### 1. Instalação

`$ yarn add axios`

#### 2. Configuração

**Arquivo /src/services/api.js**

Exemplo da estrutura do arquivo:

```js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.github.com',
});

export default api;
```