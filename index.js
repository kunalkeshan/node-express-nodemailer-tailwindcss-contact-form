/**
 * Contact Form Application
 */

// Dependencies
const express = require('express');
const path = require('path');
require('dotenv').config();
const { sendContactEmail } = require('./mailer');

// Initializing Express App
const app = express();

// Setting up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, 'public')));

// Application routes

/**
 * @description Accept contact form data and send it to the server
 * @api POST /api/contact
 * @data {string} name, {string} email, {string} message
 * @access Public
 */
app.post('/api/contact', async (req, res) => {
    // Collecting required information from the Request Body
    const { name, email, message } = req.body;
    try {
        // Sending the email
        await sendContactEmail({ to: email, name, message });
        res
            .status(200)
            .json({
                message: 'Email sent successfully',
                data: { name, email, message },
                success: true
            });
    } catch (error) {
        console.log(error);
        return res
            .status(400)
            .json({
                message: 'Unable to process request',
                data: {},
                success: false,
            })
    }
})

// Initializing Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});