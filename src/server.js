const express = require('express');
const Youch = require('youch');
const validate = require('express-validation');
const Raven = require('raven');
const routes = require('./routes');
const Mail = require('./app/services/Mail');

class App {
  constructor() {
    this.express = express();

    this.raven();
    this.middlewares();
    this.routes();
    this.exception();
  }

  raven() {
    Raven.config('https://546d547a3c16466cbf0d6d1799870bd5@sentry.io/1518775').install();
  }

  middlewares() {
    this.express.use(express.json());
  }

  routes() {
    this.express.use(routes);
  }

  exception() {
    this.express.use(async (err, req, res, next) => {
      if (err instanceof validate.ValidationError) {
        return res.status(err.status).json(err);
      }

      const youch = new Youch(err);
      const detail = await youch.toJSON();

      Raven.context(() => {
        if (req.userId) {
          Raven.setContext({ user: { id: req.userId } });
        }
        const eventId = Raven.captureException(err, { req });
        res.sentry = eventId;
      });

      await Mail.sendMail({
        from: '"App" <app@support.com>',
        to: '486df20ea9-e9ef2b@inbox.mailtrap.io',
        subject: 'App: Internal Server Error',
        html: `<pre>${JSON.stringify(detail)}<pre>`,
      });

      return res.status(err.status || 500).json({
        error: {
          message: 'Internal Server Error',
          detail,
        },
      });
    });
  }
}

module.exports = new App().express;
