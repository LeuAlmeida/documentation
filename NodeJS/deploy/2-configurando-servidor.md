# Configuração do Servidor

### Acesso

Para acessar o servidor criado, basta digitar o comando `$ ssh root@IPDIGITALOCEAN`. Caso utilizado o SSH Key não pedirá senha.

### Passo a passo para configuração do servidor

1. `$ apt update`
2. `$ apt upgrade`
3. Criar novo usuário com `$ adduser deploy` e definir uma senha para ele na sequência.
4. Dar poder de administrador para o usuário com `$ usermod -aG sudo deploy`
6. Criar pasta SSH do usuário *deploy* rodando `$ cd /home/deploy && mkdir .ssh`
5. Permitir acesso por esse usuário rodando `$ cp ~/.ssh/authorized_keys /home/deploy/.ssh`
6. Alterar propritário do authorized_keys de root para deploy executando `$ chown deploy:deploy /home/deploy/.ssh/authorized_keys`
7. Testar executando `$ exit` e na sequência acessando com `$ ssh deploy@IPDIGITALOCEAN`

