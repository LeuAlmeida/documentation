# Configurando o NGINX

### Instalação

1. Executar o comando `$ sudo apt install nginx`

### Configuração

1. Acessar a pasta `$ cd /etc/nginx/sites-available` e editar o arquivo `$ nano default`

2. Remover os comentários

3. Manter o **location / { ...** da seguinte forma:

```
location / {
  proxy_pass http://localhost:3333;
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection 'upgrade';
  proxy_set_header Host $host;
  proxy_cache_bypass $http_upgrade;
}
```

4. Reiniciar o NGINX `$ sudo service nginx restart`