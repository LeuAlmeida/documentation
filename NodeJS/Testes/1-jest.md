# Jest

* Framework de testes do Facebook;
* Back-end / front-end / mobile;
* Tudo em um só pacote;
* Code coverage integrado;
* Multi-thread integrado;

## Instalação & Configuração

Para instalar o **Jest**, basta rodar o comando `$ yarn add jest -D` para dependência de desenvolvimento.  

Inicializando o Jest  
```shell
$ yarn jest --init
```

Repostas para as perguntas do **--init**  
✔ Would you like to use Jest when running "test" script in "package.json"? … **yes**  
✔ Choose the test environment that will be used for testing › **node**  
✔ Do you want Jest to add coverage reports? … **yes**  
✔ Automatically clear mock calls and instances between every test? … **yes**

### Arquivo jest.config.js

```js
module.exports = {
  // ...

  bail: 1, // Serve para pausar o teste caso encontre alguma falha

  collectCoverage: true, 

  collectCoverageFrom: ['src/app/**/*.js'], // Pasta onde estão os arquivos a serem testados

  coverageDirectory: '__tests__/coverage', // Pasta onde será renderizado os Coverages

  coverageReporters: ['text', 'lcov'],

  testMatch: ['**/__tests__/**/*.test.js'], // Arquivos a serem testados
  
  transform: {
    '.(js|jsx|ts|tsx)': '@sucrase/jest-plugin', // Permitir a sintaxe do ES6 ao invés do CommaJS
  },
  // ...
}
```

**Criar uma pasta __tests__ na raiz**

### Sucrase + Jest
Como padrão, o Jest interpreta apenas sintaxes utilizando o CommonJS *(import/export)*. Para mudar isso é necessário instalar a dependência que integra o Sucrase com o Jest rodando o comando `$ yarn add --dev @sucrase/jest-plugin`

**Certificar-se que o transform foi inserido no jest.config.js**

**Arquivo nodemon.json**
```json
{
  "execMap": {
    "js": "sucrase-node"
  },
  "ignore": [
    "__tests__"
  ]
}
```