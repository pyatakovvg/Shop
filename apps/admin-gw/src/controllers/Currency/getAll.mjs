'use strict';

import { get } from '../../requests/Currency/index';


export default () => async (ctx) => {

  const { data } = await get();

  ctx.body = {
    items: data
  };
}