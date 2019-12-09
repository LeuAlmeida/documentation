# Redux

## 1. Conceitos

#### 1.1 O que é Redux?

* Biblioteca que implementa a Arquitetura Flux;
* Controle de estados globais;
* Quando utilizar o Redux?
  * Meu estado tem mais de um "dono"?
  * Meu estado é manipulado por mais componentes?
  * As ações do usuário causam efeitos colaterais nos dados?
* Exemplos: Carrinho de compras, dados do usuário, player de música, etc;

#### 1.2 Arquitetura Flux

Exemplo gráfico

**CATÁLOGO** -> Action

Exemplo da Action:

```js
{
  type: "ADD_TO_CART",
  product: { ... }
}
```

Action -> Redux Store (Reducers) -> Mutação no estado

#### 1.3 Princípios

* Toda action deve possuir um *type*;
* O estado do Redux é o único ponto de verdade;
* Não podemos *mutar o estado do Redux sem uma action*;
* As actions e reducers são funções puras, ou seja, *não lidam com side-effects assíncronos*;
* Qualquer lógica síncrona para regras de negócio *deve ficar no reducer e nunca na action*;
* **Nem toda aplicação precisa do Redux, inicie sem ele e sinta a necessidade depois**;

## 2 Instalação

Instalação do Redux no React
`$ yarn add redux react-redux`