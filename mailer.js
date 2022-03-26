/**
 * Node Mailer Setup
 */

// Dependencies
const nodemailer = require('nodemailer');
const email = process.env.MAIL_EMAIL;
const password = process.env.MAIL_PASSWORD;

// Mail Transporter
const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: email,
        pass: password,
    },
    from: 'Kunal Keshan <kk1738@srmist.edu.in>'
});

/**
 * @description Send email to the user
 * @param {object} options 
 * @param {string} options.to
 * @param {string} options.subject
 * @param {string} options.message
 */
exports.sendContactEmail = ({ to, name, message }) => {
    const mailOptionsToOwner = {
        to: email,
        subject: `Contact Form Submission from ${name} <${to}>`,
        html: `
            <h1>Contact Form Submission</h1>
            <p>Name: ${name} <${to}></p>
            <p>${message}</p>
        `
    }

    const mailOptionsToUser = {
        to,
        subject: 'Thanks for contacting me!',
        text: 'I will get back to you soon!'
    }

    return Promise.all([transport.sendMail(mailOptionsToOwner), transport.sendMail(mailOptionsToUser)])
}