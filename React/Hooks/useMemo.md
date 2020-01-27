# Uso do Hook useMemo

O useMemo serve para realizar cálculos ou verificações apenas quando uma variável sofrer alterações.

### Exemplo do uso

No exemplo abaixo, o `techSize` será modificado apenas quando a variável `tech` sofrer alterações, obtendo assim as informações contidas em `tech.length`.

```js
const techSize = useMemo(() => tech.length, [tech]);
```