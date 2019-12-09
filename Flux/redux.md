# Redux

### O que é Redux?

* Biblioteca que implementa a Arquitetura Flux;
* Controle de estados globais;
* Quando utilizar o Redux?
  * Meu estado tem mais de um "dono"?
  * Meu estado é manipulado por mais componentes?
  * As ações do usuário causam efeitos colaterais nos dados?
* Exemplos: Carrinho de compras, dados do usuário, player de música, etc;

### Arquitetura Flux

Exemplo gráfico

**CATÁLOGO** -> Action

Exemplo da Action:

```js
{
  type: "ADD_TO_CART",
  product: { ... }
}
```

Action -> Redux Store (Reducers)