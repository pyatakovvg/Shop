
import logger from '@sys.packages/logger';
import { emit } from "@sys.packages/socket.io";


export default () => async (event) => {
  try {
    const fields = JSON.parse(event);

    emit(process.env['SOCKET_FORM_UPDATED'], fields);
  }
  catch(error) {

    logger['error'](error);
  }
};