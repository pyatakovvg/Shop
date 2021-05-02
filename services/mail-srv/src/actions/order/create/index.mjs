
import logger from '@sys.packages/logger';

import nunjucks from 'nunjucks';
import nodeMailer from 'nodemailer';

import builderData from './builds/data.mjs';


export default async (data) => {
  const transporter = nodeMailer.createTransport({
    host: process.env['EMAIL_HOST'],
    port: process.env['EMAIL_PORT'],
    ssl: true,
    tls: false,
    auth: {
      user: process.env['EMAIL_USER'],
      pass: process.env['EMAIL_PASSWORD'],
    }
  });

  const html = nunjucks.render('order/created/index.html', builderData(data));

  const info = await transporter.sendMail({
    from: "glassshoprobot@gmail.com",
    to: data['meta']['email'],
    subject: 'Заказ в интернет магазине',
    html,
    attachments: data['products'].map((product) => ({
      path: product['preview'],
      cid: product['uuid'],
    })),
  });

  logger['info'](info);
}
