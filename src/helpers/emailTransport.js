const { createTransport } = require("nodemailer")

const transport = createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
        user: process.env.USER_SMTP,
        pass: process.env.BREVO_SMTP_KEY
    }
})

module.exports = {
    transport
}