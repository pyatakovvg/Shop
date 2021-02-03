
import { middlewareErrors } from '@packages/errors';

import logger from '@sys.packages/logger';
import connectToDatabase from '@sys.packages/db';
import appServer, { initRouter } from '@sys.packages/server';
import { connection as rabbitConnection } from "@sys.packages/rabbit2";

import http from 'http';

import routes from './routes';


(async () => {
  try {
    await connectToDatabase(process.env['DB_CONNECTION_HOST']);
    await rabbitConnection(process.env['RABBIT_CONNECTION_HOST']);

    appServer.use(middlewareErrors());

    const httpServer = http.createServer(appServer.callback());

    initRouter(routes);

    httpServer.listen(process.env['PORT'], () => logger['info']('Server started on port', process.env['PORT']));
  }
  catch(error) {

    logger['error'](error);
  }
})();
