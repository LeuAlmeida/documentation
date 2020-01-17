# Geolocalização

### Localização Atual

```js
function App() {
  // ...
  useEffect(() => {
    navigator.geolocation.getCurrentPosition( // Função para obter a localização atual
      position => {
        console.log(position);   // Callback do retorno da posição
      },
      err => {
        console.log(err); // Erro
      },
      {
        timeout: 30000, // Timeout de 30 segundos
      }
    );
  }, []);
  // ...
```

### Setando estados com latitude e longitude

```js
const [latitude, setLatitude ] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        
        setLatitude(latitude);
        setLongitude(longitude);
      },
      err => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    );
  }, []);
  ```