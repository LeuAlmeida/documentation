# :bee: Bee-Queue
Ferramenta para perfomatizar filas de tarefas com NodeJS


#### 1. Instalação
`$ yarn add bee-queue`

#### 2. Configurações

**Arquivo src/lib/Queue.js**

```js
import Bee from 'bee-queue';
import CancellationMail from '../app/jobs/CancellationMail';
import redisConfig from '../config/redis';

const jobs = [CancellationMail];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.process(handle);
    });
  }
}

export default new Queue();
```

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
        date: format(appointment.date, "'dia' dd 'de' MMMM', às' H:mm'h'", {        // a fila para envio de
          locale: pt,                                                               // e-mail referente a
        }),                                                                         // um cancelamento.
      },                                                                            
    });                                                                             
  }
}

export default new CancellationMail();

```

##### 4. Mudanças no Controller

**Arquivo src/app/controllers/AppointmentControllers.js**

```js

// Importação dos arquivos referentes à fila
import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

// [...] Dentro do método necessário...

// Adicionar o métood à fila
await Queue.add(CancellationMail.key, {
      appointment,
    });
```

##### 5. Arquivos para processamento da fila em outro Node

**Arquivo ./src/queue.js**

```js
import Queue from './lib/Queue';

Queue.processQueue();
```

**Arquivo package.json**

```json
"scripts": {
  "queue": "nodemon src/queue.js",
}
```

##### 6. Prevenção contra erros

**Arquivo src/lib/Queue.js**

**Alterações no processamento com o método `.on('failed', this.handleFailure)`**

```js
bee.on('failed', this.handleFailure).process(handle);
```

**Criação do método handleFailure**

```js
handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
```