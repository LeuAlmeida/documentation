# Criando Testes

Antes de tudo, é interessante instalar o intellisense com o comando `$ yarn add -D @types/jest `.

## `test()` 

A função `test()` serve para criar um teste. É escrito da seguinte forma:
```js
test('', () => {})
// ...
```

## `expect()`

A função `expect()` serve para esperar um retorno de determinado teste. É escrito da seguinte forma:
```js
expect(variável).toBe(resultado)
// o .toBe possui diversas opções para o resultado esperado
```

## `test() & expect()`

Exemplo:

```js
// Função de exemplo
function soma(a, b) {
  return a + b;
}


test('If i call soma function with 4 and 5 it should return 9', () => {
  const result = soma(4, 5);

  expect(result).toBe(9);
});
```

**Arquivo __tests__/example.test.js**

