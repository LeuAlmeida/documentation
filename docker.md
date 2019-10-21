# Docker
## Manual de Uso

#### Como funciona?
* Criação de ambientes isolados *(container)*;
* Containers expõe portas para comunicação;

#### Principais conceitos
* Imagem (serviço disponível, exemplo: SQL, Postgres, REdis)
* Container (instância de uma imagem)
* Docker REgistry (Docker Hub)
* Dockerfile:
  * Receita de uma imagem 

### Comandos
- Para listar todos os containers que estão rodando `$ docker ps`
- Para listar todos os containers (incluindo os que não estão rodando) `$ docker ps -a`
- Para parar um container usa-se `$ docker stop NOME_DO_CONTAINER`, exemplo: `$ docker stop database`
- Para iniciar um container parado, usa-se `$ docker start NOME_DO_CONTAINER`

#### Criando serviço de Banco de dados Postgres
*https://hub.docker.com/_/postgres*

* Iniciar usando `$ docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres:11`
  * Ao finalizar, exibirá o id do container
