# React Native Vector Icons

**Nomes e pacotes disponíveis em:**


https://oblador.github.io/react-native-vector-icons/

#### 1. Instalação

`$ yarn add react-native-vector-icons`

##### 1.1 iOS

**Arquivo ios/NOMEDOPROJETO/Info.plist**

Adicionar as linhas antes de fechar o último </dict>:

```js
<key>UIAppFonts</key>
<array>
  <string>AntDesign.ttf</string>
  <string>Entypo.ttf</string>
  <string>EvilIcons.ttf</string>
  <string>Feather.ttf</string>
  <string>FontAwesome.ttf</string>
  <string>FontAwesome5_Brands.ttf</string>
  <string>FontAwesome5_Regular.ttf</string>
  <string>FontAwesome5_Solid.ttf</string>
  <string>Foundation.ttf</string>
  <string>Ionicons.ttf</string>
  <string>MaterialIcons.ttf</string>
  <string>MaterialCommunityIcons.ttf</string>
  <string>SimpleLineIcons.ttf</string>
  <string>Octicons.ttf</string>
  <string>Zocial.ttf</string>
</array>
```

##### 1.2 Android

**Arquivo android/app/build.grandle**

Para adicionar todas as fontes:
`apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"` na última linha.

Para adicionar fontes específicas:

```groovy
project.ext.vectoricons = [
    iconFontNames: [ 'MaterialIcons.ttf', 'EvilIcons.ttf' ] // Name of the font files you want to copy
]

apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
```

#### 2. Exemplo de uso

```js
import Icon from 'react-native-vector-icons/MaterialIcons';

<Icon name="add" size={20} color="#FFF" />
```