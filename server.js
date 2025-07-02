const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve frontend

// Email sending logic
app.post('/submit', async (req, res) => {
  const { timestamp, choices } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your_email@gmail.com',       // <- your Gmail
      pass: 'your_app_password_here'      // <- Gmail App Password (NOT normal password)
    }
  });

  const mailOptions = {
    from: 'your_email@gmail.com',
    to: 'samsonisaac1172@gmail.com',      // <- Receiver (your Gmail)
    subject: 'Message Convo Submission',
    text: `Timestamp: ${timestamp}\nChoices:\n${JSON.stringify(choices, null, 2)}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
