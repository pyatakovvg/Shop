
import request from "@sys.packages/request";


export default () => async (ctx) => {
  const formData = ctx['request']['body'];

  const { data } = await request({
    url: process.env['PRODUCT_API_SRV'] + '/currencies',
    method: 'post',
    data: formData,
  });

  ctx.body = {
    success: true,
    data: data,
  };
};
