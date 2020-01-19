# Criação do Servidor

### Digital Ocean

* Create Droplet
  * Marketplace
  * Docker
  * Standard
  * $ 5/mo
  * New York
* SSH keys
  * New SSH Key
    * No Linux, executar `$ ssh-keygen` ou acessar `$ cd ~/.ssh/ `
    * Acessar o *id_rsa.pub* rodando o `$ cat id_rsa.pub`
    * Copiar todo o conteúdo
    * Colar na SSH Keys da Digital Ocean e setar um nome
    * Após salvar, selecionar a chave
* Choose a hostname com o nome do servidor
* Create Droplet