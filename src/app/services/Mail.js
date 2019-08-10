const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  ssl: false,
  tls: true,
  auth: {
    user: '0fc7eec1cf0c71', // your Mailtrap username
    pass: '4cfe7c4fdb1a2f', // your Mailtrap password
  },
});

module.exports = transport;
