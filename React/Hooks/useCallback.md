# Uso do hook useCallback

O `useCallback` é semelhante ao [usemMemo](./useMemo.md), mas ao invés de retornar um único valor, ele retorna uma função.

### Exemplo de uma função que se torna um hook de useCallback

**handleAdd anterior**
```js
function handleAdd() {
  setTech([...tech, newTech]);
  setNewTech('');
}
```

**handleAdd utilizando o useCallback**
```js
const handleAdd = useCallback(() => { // Uma variável utilizando o useCallback que retorna uma função
  setTech([...tech, newTech]);
  setNewTech('');
}, [newTech, tech]); // Array de dependências passando as novas tecnologias vindas do input como primeiro índice e as tecnologias no segundo índice do array
```

Com essas alterações, o estado não será montado toda vez que houver uma alteração, o que otimiza a performance da aplicação.