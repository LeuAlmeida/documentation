# Nodemailer

#### 1. Instalação
`yarn add nodemailer`

#### 2. Provedores de e-mail
* Amazon SES **(o melhor)**
* Mailgun
* Sparkpost
* Mandril (Mailchimp)
* Mailtrap **(ambientes de desenvolvimento)**

#### 3. Arquivo de configurações src/config/mail.js
As informações abaixos, caso obtidos pelo **mailtrap** encontram-se em SMTP Settings

```js
export default {
  host: '',
  port: '',
  secure: false,
  auth: {
    user: '',
    pass: '',
  },
  default: {
    from: 'Equipe GoBarber <noreply@gobarber.com>',
  },
};
```