import express from 'express';
import path from 'path';
import * as Sentry from '@sentry/node';
import routes from './routes';
import './database';
import SentryConfig from './config/sentry';

import 'express-async-errors';

class App {
  constructor() {
    this.server = express();

    Sentry.init(SentryConfig);

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.requestHandler());
  }
}

export default new App().server;
