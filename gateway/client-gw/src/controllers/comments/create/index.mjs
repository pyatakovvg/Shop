
import request from '@sys.packages/request';


const PRODUCT_API_SRV = process.env['PRODUCT_API_SRV'];


export default () => async (ctx) => {
  const { id } = ctx['params'];
  const { ...formData } = ctx['request']['body'];

  const { data } = await request({
    method: 'post',
    url: `${PRODUCT_API_SRV}/comments`,
    data: {
      productId: id,
      ...formData,
    },
  });

  ctx.body = {
    success: true,
    data: {
      id: data['id'],
      person: data['person'],
      comment: data['comment'],
      productId: data['productId'],
      createdAt: data['createdAt'],
      evaluation: data['evaluation'],
    },
  };
}
