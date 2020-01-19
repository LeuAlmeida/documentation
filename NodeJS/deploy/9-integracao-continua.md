# Integração Contínua

### Buddy.works

1. Criar um novo projeto
2. Sincronizar com o repositório
3. Criação da pipeline
  3.1. Nomear
  3.2. On push
  3.3. Add new pipeline
4. Pesquisar por `DigitalOcean` e selecionar a opção Droplet
5. Setup:
  5.1. Github Repository
  5.1. Source path: /
  5.2. Logar com a conta da DigitalOcean e selecionar o Droplet
  5.3. Selecionar o login `deploy` 
  5.4. O `authentication mode` é Buddy's SSH Key
  5.5. O código deve ser colado dentro do servidor
  5.6. O `remote path` é o caminho em que está a aplicação. Exemplo: `~/mail.sender.api`
6. `Execute SSH Commands on a remote server`
  6.1. Colar os comandos SSH. Exemplo:
```
npm run build
pm2 restart umesp.api
```
  6.2. em `Hostname & Port` entrará o IP da DigitalOcean
  6.3. em login será `deploy`
  6.4. O `Authentication mode` é Buddy's SSH Key
  6.5 O `Working directory` será o mesmo caminho da aplicação `~/umesp.api`