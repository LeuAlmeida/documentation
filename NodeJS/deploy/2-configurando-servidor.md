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

### Instalação do Node

1. Acessar o site https://nodejs.org/en/
2. Em **Other Downloads** selecionar a opção **Installing Node.js via package manager** e selecionar a opção **Ubuntu**, onde levará para um link externo.
3. Neste link externo, procurar pela versão LTS (10.x), onde deve-se copiar o código e colar no SSH.
4. Executar o comando `$ sudp apt-get install -y nodejs`
5. Testar a instalação com `$ node -v` e `$ npm -v`