const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const EMAIL = "sklharish@gmail.com";
const APP_PASSWORD = "gustaxugfjwhhgre";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: APP_PASSWORD
  }
});

app.post("/send", async (req, res) => {
  try {
    const { name, email, position, status } = req.body;

    if (!name || !email || !position || !status) {
      return res.status(400).json({ msg: "All fields required" });
    }

    let subject, text;

    if (status === "selected") {
      subject = `Selection Confirmation - ${position}`;
      text = `Dear ${name},

We are pleased to inform you that you have been selected for the position of ${position}.

Please reply to confirm your acceptance.

Best regards,
HR Team`;
    } else {
      subject = `Application Update - ${position}`;
      text = `Dear ${name},

Thank you for applying for the position of ${position}.

We regret to inform you that we have moved forward with other candidates.

Best regards,
HR Team`;
    }

    await transporter.sendMail({
      from: EMAIL,
      to: email,
      subject,
      text
    });

    res.json({ msg: "Email sent successfully" });

  } catch (error) {
    console.error("EMAIL ERROR:", error);
    res.status(500).json({ msg: "Email failed. Check App Password." });
  }
});

app.listen(3000, () => {
  console.log("Backend running on port 3000");
});
