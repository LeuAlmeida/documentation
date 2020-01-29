# Multer para upload de arquivos
### 

` $ yarn add multer ` para instalar o multer.

Cria-se uma pasta **tmp/uploads/** para armazenar os uploads da aplicação (fora de src).

### src/app/config/multer.js

Exemplo da estrutura inicial das configurações do multer:

```js
import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        return cb(null, res.toString('hex') + extname(file.originalname));
      })
    },
  }),
};
```

**Arquivo src/routes.js**

Importar as configurações
```js
import multer from 'multer';
import multerConfig from './config/multer';
```

Definir após `const routes`:

```js
const upload = multer(multerConfig);
```

Rota com upload utilizando o Multer:

```js
routes.post('/files', upload.single('file'), FileController.store);
```

