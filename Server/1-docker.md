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

**Arquivo docker-compose.yml**

Exemplo do modelo:

```yml
version: "3"

networks:
  postgres-compose-network:
    driver: bridge

services:
  app:
    build: .
    ports:
      - "3333:3333"
    command: bash -c "yarn dev && yarn queue"

  postgres:
    container_name: mailsenderdev
    image: postgres:11
    environment:
      POSTGRES_USER: ${POSTGRES_USER:-postgres}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-P1sosolto1}
    volumes:
        - /usr/mailsender/postgres:/data/postgres
    ports:
      - "5430:5432"
    networks:
      - postgres-compose-network
    restart: unless-stopped

  redis:
    container_name: redismailsenderdev
    image: redis:alpine
    ports:
      - "6377:6379"
    volumes:
      - ../data/redis:/data
    entrypoint: redis-server --appendonly yes
    restart: always
```