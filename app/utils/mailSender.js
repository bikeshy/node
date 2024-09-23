// utils/mailSender.js
const nodemailer = require('nodemailer');

const mailSender = async (email, body) => {
    try {
        // Create a Transporter to send emails
        let transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        }
        });
        // Send emails to users
        let info = await transporter.sendMail({
        from: 'bkyadav207@gmail.com',
        to: email,
        subject: "test",
        html: body,
        });
        console.log("Email info: ", info);
        return info;
    } catch (error) {
        console.log(error.message);
    }
};
module.exports = mailSender;