# Configuração da Statusbar

Exemplo do uso **(Arquivo App.js)**:

```js

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <Routes />
    </>
  );
}
```

# Configuração das opções da navegação

Exemplo do uso **(arquivo routes.js)**:

```js

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main: {
        screen: Main,
        navigationOptions: {
          title: 'DevRadar',
        },
        Profile: {
          screen: Profile,
          navigationOptions: {
            title: 'Perfil no Github',
          },
        },
      },
      Profile,
    },
    {
      defaultNavigationOptions: {
        headerTintColor: '#FFF',
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: '#7159c1',
        },
        headerTitleAlign: 'center',
      },
    }
  )
);

export default Routes;
```