# Docker Machine

### Instalação

Seguir a documentação: https://docs.docker.com/machine/install-machine/

### Criação

Deve ser criado após configuração do Aws Cli

```zsh
$ docker-machine create --driver amazonec2 NOMEDAMAQUINA
```

### Configurações finais

```zsh
$ docker-machine env NOMEDAMAQUINA
```

Como output, ele dará um código **eval $(...)**. Este código deverá **ser colado na sequência**.

Após isso, o docker será executado diretamente no servidor

```zsh
$ docker-compose up -d
```