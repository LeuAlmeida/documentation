# Local Storage

Local Storage, como o nome já diz, é o armazenador de informações nativo do navegador do usuário. Suas informações são armazenadas em cache, de forma que não se utiliza um banco de dados próprio para isto.

### Setando informações no Local Storage

Exemplo utilizando um React Hook

```js
useEffect(() => {
    localStorage.setItem('tech', JSON.stringify(tech));
  }, [tech]);
```

No exemplo acima, será armazenado a variável **tech** com o nome (em string) `'tech'` convertida em um objeto *JSON* sempre que houver uma mutação no estado de **tech**.