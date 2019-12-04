# Rotas do ReactJS

### Instalação

1. Executar o comando
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
        <Route path="/" component={Main} />
        <Route path="/repository" component={Repository} />
      </Switch>
    </BrowserRouter>
  );
}
```

3. Importação das rotas no **src/App.js**

