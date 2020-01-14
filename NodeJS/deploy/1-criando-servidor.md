# Criação do Servidor

### Digital Ocean

1. Create Droplet
  1.1 Marketplace
  1.2 Docker
  1.3 Standard
  1.4 $ 5/mo
  1.5 New York
2. SSH keys
  2.1 New SSH Key
    2.1.1 No Linux, executar `$ ssh-keygen` ou acessar `$ cd ~/.ssh/ `
    2.1.2 Acessar o *id_rsa.pub* rodando o `$ cat id_rsa.pub`
    2.1.3 Copiar todo o conteúdo
    2.1.4 Colar na SSH Keys da Digital Ocean e setar um nome
    2.1.5 Após salvar, selecionar a chave
3. Choose a hostname com o nome do servidor
4. Create Droplet