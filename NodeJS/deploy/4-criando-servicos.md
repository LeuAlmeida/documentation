# Criando Serviços

### Docker

Na DigitalOcean, ao selecionar o Docker no marketplace, ele já deve vir instalado. Entretanto, necessita permissões de *sudo*. Para solucionar isso, deve-se seguir os seguintes passos:

1. `$ sudo groupadd docker`
2. `$ sudo usermod -aG docker $USER`
3. Deslogar e logar novamente

**Feito isso, todos os DOCKER RUN podem ser executados.**

### PostgreSQL

Para criar o banco de dados do PostgreSQL sem utilizar o Postbird, deve-se seguir os seguintes passos:

1. `$ docker exec -i -t NOMEDOCONTAINER /bin/sh`
2. Feito isso estará dentro do container do Postgres
3. `$ su postgres`
4. `$ psql`
5. Feito isso, estará dentro das tabelas
6. `$ CREATE DATABASE nomedadatabase`
7. `$ \q` para sair
8. `$ exit` para sair
9. `$ exit` para sair novamente