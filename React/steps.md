# Passos para insatalação

### Preparando o ambiente

```console
$ yarn create react-app NOMEDOAPP
```

**Remoção do eslint no package.json**

```json
 "eslintConfig": {
    "extends": "react-app"
  },
```

**Remoção do manifest.json no index.html**

```html
<link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
```

**Remoção do serviceWorker e index.css no src/index.js**

```js
import "./index.css";
import * as serviceWorker from "./serviceWorker";

serviceWorker.unregister();
```

**Remoção de conteúdo no src/App.js**

```js
import logo from "./logo.svg";
import "./App.css";

<header className="App-header">
  <img src={logo} className="App-logo" alt="logo" />
  <p>
    Edit <code>src/App.js</code> and save to reload.
  </p>
  <a
    className="App-link"
    href="https://reactjs.org"
    target="_blank"
    rel="noopener noreferrer"
  >
    Learn React
  </a>
</header>;
```

**Estrutura final de pastas**

* public
  * favicon.ico
  * index.html
* src
  * App.js
  * index.js
