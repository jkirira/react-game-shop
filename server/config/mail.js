import nodemailer from 'nodemailer';

const support = process.env.SUPPORT_EMAIL || 'no-reply@gameshop.com';

const mailer = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
});

export {
  support,
  mailer
}
