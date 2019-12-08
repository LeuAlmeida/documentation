# Rotas do ReactJS

### Instalação

##### 1. Executar o comando
`$ yarn add react-router-dom`

2. Criação do arquivo **src/routes.js**

Exemplo do modelo:
```js
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/Main';
import Repository from './pages/Repository';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/repository" component={Repository} />
      </Switch>
    </BrowserRouter>
  );
}
```

##### 3. Importação das rotas no src/App.js

Exemplo:

```js
import React from 'react';

import Routes from './routes';

function App() {
  return (
    <>
      <Routes />
    </>
  );
}

export default App;
```

##### 4. Usando links através das rotas

Importação

```js
import { Link } from 'react-router-dom';
```

Uso das rotas

```js
<Link to="/repository">Caminho do Repositório</Link>
```