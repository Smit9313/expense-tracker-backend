const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../model/User");
const { validationResult } = require("express-validator");
const nodemailer = require('nodemailer');

var Mailgen = require('mailgen');

exports.register = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    throw error.array();
  }
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    //hashing the password before saving it in database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    throw error.array();
  }
  try {
    const { email, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    //compare passwords using compare method of Bcrypt module and check for equality with stored hash value from db
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Generate and send a JWT token
    const token = jwt.sign({ username: user.username, id: user.id }, "ABC", {
      expiresIn: "10h",
    });

    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error." });
  }
};

exports.sendMail = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    throw error.array();
  }
  const { to, subject, text } = req.body;

  const user = await User.findOne({ email: to });

  if (user) {

    const token = jwt.sign({ username: user.username }, "PQR", { expiresIn: "1h" })

    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Use your email service provider
      auth: {
        user: 'smitdudhat10@gmail.com', // Your email address
        pass: 'djoa qgpx ubug qojr', // Your email password
      },
    });

    // Configure mailgen by setting a theme and your product info
    var mailGenerator = new Mailgen({
      theme: 'default',
      product: {
        // Appears in header & footer of e-mails
        name: 'amazon',
        link: 'react.dev'
        // Optional product logo
        // logo: 'https://mailgen.js/img/logo.png'
      }
    });

    const route = "http://localhost:8080/user/changepassword/" + token;

    // Generate the email template
    const email = {
      body: {
        name: 'Customer Name',
        intro: `We are thrilled to confirm your recent purchase on Your E-commerce Website!<br><br>
            <b>Order Number:</b> [Order Number]<br>
            <b>Order Date:</b> [Order Date]<br>
            <b>Delivery Address:</b> [Shipping Address]<br><br>`,
        table: {
          data: [
            {
              item: 'Product 1',
              description: 'Description of Product 1',
              price: '$99.99',
              quantity: '1',
              total: '$99.99',
            },
            {
              item: 'Product 2',
              description: 'Description of Product 2',
              price: '$49.99',
              quantity: '2',
              total: '$99.98',
            },
          ],
          columns: {
            // Optionally, you can customize column headers
            custom: {
              item: '<b>Item</b>',
              description: '<b>Description</b>',
              price: '<b>Price</b>',
              quantity: '<b>Quantity</b>',
              total: '<b>Total</b>',
            },
          },
        },
        outro: `<b>Order Total:</b> $[Order Total]<br>
        <b>Payment Method:</b> [Payment Method]<br>
        <b>Shipping Method:</b> [Shipping Method]<br>
        <b>Estimated Delivery Date:</b> [Estimated Delivery Date]<br><br>
        
        We will notify you via email once your order has been shipped, and you can track its status.
        Please don't hesitate to reach out to our customer support team if you have any questions or need assistance.<br><br>
        
        Thank you for shopping with us! We value your business and look forward to serving you again in the future.<br><br>
        
        Sincerely,<br>
        The [Your E-commerce Website Name] Team<br><br>
        
        [Your Contact Information]<br>
        <b>Website:</b> [Your Website URL]<br>
        <b>Email:</b> [Your Customer Support Email]<br>
        <b>Phone:</b> [Your Customer Support Phone Number]`,
      },
    };
    // Generate an HTML email with the provided contents
    var emailBody = mailGenerator.generate(email);

    const mailOptions = {
      from: 'smitdudhat10@gmail.com',
      to,
      subject: "Order Confirmation - Your Recent Purchase",
      html: emailBody
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Email could not be sent' });
      } else {
        console.log('Email sent:', info.response);
        res.json({ message: 'Email sent successfully' });
      }
    });
  } else {
    return res.json({ message: "user not found!!!" })
  }
}

exports.changePassword = async (req, res) => {
  const token = req.params.token;
  const error = validationResult(req);
  if (!error.isEmpty()) {
    throw error.array();
  }
  const verify = jwt.verify(token, "PQR");
  const username = verify.username;

  const user = await User.findOne({ username })
  user.password = await bcrypt.hash(req.body.password, 10)
  user.save();
  res.json({ message: "password changed!!", data: user });
}
