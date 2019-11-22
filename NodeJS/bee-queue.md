# :bee: Bee-Queue
Ferramenta para perfomatizar filas de tarefas com NodeJS


#### 1. Instalação
`$ yarn add bee-queue`

#### 2. Configurações

**Arquivo src/lib/Queue.js**


#### 3. Arquivo de filas

**Arquivo src/app/jobs/CancellationMail.js *(exemplo)***

```js
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { appointment } = data;

    await Mail.sendMail({
      to: `${appointment.provider.name} <${appointment.provider.email}>`,           // Conteúdo
      subject: 'Agendamento cancelado',                                             // transferido
      template: 'cancellation',                                                     // do controller
      context: {                                                                    // AppointmentController.js
        provider: appointment.provider.name,                                        //
        user: appointment.user.name,                                                // Aqui será tratado
        date: format(appointment.date, "'dia' dd 'de' MMMM', às' H:mm'h'", {        // a fila.
          locale: pt,                                                               //
        }),                                                                         //
      },                                                                            //
    });                                                                             //
  }
}

export default new CancellationMail();

```