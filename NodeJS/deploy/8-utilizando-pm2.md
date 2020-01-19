# Utilizando o PM2

### Instalação

A instalação é feita de forma global utilizando o comando `$ sudo npm install -g pm2`

### Criação de um Serviço

Para criar um serviço monitorado pelo PM2 deve-se executar o comando `$ pm2 start /home/deploy/umesp.api/dist/serr.js --name umesp.api`

### Manter o PM2 rodando quando reiniciado

Para manter o sistema do PM2 rodando mesmo quando reiniciado, deve-se rodar o comando `$ pm2 startup systemd` e com o retorno *sudo env PATH=$PATH.......* deve ser colado este código no SSH.

### Comandos úteis do PM2

Listar aplicações: `$ pm2 list` <br/>
Visualizar monitor de logs: `$ pm2 monit` <br/>
Parar um serviço: `$ pm2 stop <ID ou NOME>` <br/>
Reiniciar um serviço `$ pm2 restart <ID ou NOME>`