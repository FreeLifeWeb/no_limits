const nodemailer = require('nodemailer');

const sendResponse = (req) => {
  const transporter = nodemailer.createTransport(
    {
      host: 'smtp.yandex.ru',
      port: 465,
      secure: true,
      auth: {
        user: 'khasiev-93@yandex.ru',
        pass: 'Sarmat08!',
      },
    },
  );
  transporter.sendMail({
    from: 'khasiev-93@yandex.ru',
    to: req.email,
    subject: 'Приглашение на собеседование',
    text: req.message,
  }, (err, info) => {
    if (err) console.log('-------err', err);
    console.log('Email sent: ', info);
  });
};

module.exports = sendResponse;
