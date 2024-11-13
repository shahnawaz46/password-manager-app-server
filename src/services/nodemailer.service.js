import transporter from '../config/nodemailer.config.js';

const sendMail = async (senderMail, subject, body) => {
  const mailOptions = {
    from: 'GuardVault shahnawaz85748@gmail.com',
    to: senderMail,
    subject: subject,
    // text: 'Hello to myself!',
    html: body,
  };

  try {
    const res = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + res.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export default sendMail;
