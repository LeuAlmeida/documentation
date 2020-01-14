# Dicas do SSH

### Encerrar uma porta

1. Rodar o comando `$ lsof -i :3333` para obter o ID daquela porta
2. Copiar o **PID** e executar o comando `$ kill -9 NUMERODOPID`

### Setar timeout ilimitado

1. Acessar à pasta `$ cd /etc/ssh` e editar o arquivo `$ sudo nano sshd_config`

2. Incluir as configurações abaixo no final do arquivo:

```
ClientAliveInterval 30
TCPKeepAlive yes
ClientAliveCountMax 99999
```

3. Reiniciar o serviço do SSH rodando `$ sudo service sshd restart`

4. Sair e voltar do servidor