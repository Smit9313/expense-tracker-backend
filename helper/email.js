const nodemailer = require('nodemailer') // Import nodemailer library

exports.sendVerificationEmail = async (email) => {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD
      }
    })
    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: email, // recipient email address
      subject: 'Email Verification',
      html: `<p ClassName='text-dark'>
      Click the following link to verify your email:</p>
  <a href='http://localhost:8080/verify/${email}'>Verify your Email</a>`
    }
    transporter.sendMail(mailOptions)
  }
  