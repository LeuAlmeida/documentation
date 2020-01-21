# WebView

Para renderizar páginas da web sem a necessidade de chamar o browser, para isso há o **WebView**.

### Instalação

Utilizando o Expo, deve-se executar o comando `$ expo install react-native-webview`

### Exemplo de Uso

Importação

```js
import { WebView } from 'react-native-webview';
```

Renderizando uma página da web

```js
return (
  <WebView
    style={{ flex: 1 }}
    source={{ uri: 'https://github.com/LeuAlmeida' }}
  />
);
```
