const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "YOUR_GMAIL@gmail.com",
        pass: "YOUR_APP_PASSWORD" 
    }
});

app.post("/send", async(req,res)=>{
    try{
        await transporter.sendMail({
            from: "HR Team",
            to: req.body.email,
            subject: "Regarding your job application",
            text: req.body.message
        });
        res.json({msg:"Email sent successfully!"});
    }catch(err){
        res.json({msg:"Sending failed!"});
    }
});

app.listen(3000, ()=> console.log("Backend running on 3000"));
