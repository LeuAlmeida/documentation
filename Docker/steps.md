# Docker

## Passo a Passo para Instalação

#### Arquivos

**Arquivo Dockerfile**

```dockerfile
FROM node:10-alpine

WORKDIR /usr/app
COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3333
CMD ["yarn", "dev" ; "yarn", "queue"]
```

**Arquivo .dockerignore**

`node_modules/`