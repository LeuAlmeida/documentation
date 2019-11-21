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
  host: '',           // Host do e-mail.        Exemplo: smtp.mailtrap.io
  port: '',           // Porta do e-mail.       Padrão: 2525
  secure: false,      // Segurança do e-mail.
  auth: {             // Login para autenticar
    user: '',
    pass: '',
  },
  default: {
    from: 'Equipe GoBarber <noreply@gobarber.com>',
  },
};
```
#### 4. Arquivo de configurações src/lib/Mail.js
Arquivo de configurações gerais do NodeMailer

```js
import nodemailer from 'nodemailer';
import mailConfig from '../config/mail';

class Mail {
  constructor() {
    const { host, port, secure, auth } = mailConfig;

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null,
    });
  }

  sendMail(message) {
    return this.transporter.sendMail({
      ...mailConfig.default,
      ...message,
    });
  }
}

export default new Mail();
```

#### 5. Importação do Mail.js nos Controllers (exemplo)
```js
import Mail from '../../lib/Mail';        // Importação da lib Mail

await Mail.sendMail({
      to: `${appointment.provider.name} <${appointment.provider.email}>`,
      subject: 'Agendamento cancelado',
      text: 'Você tem um novo cancelamento.',
    });
```