// const nodemailer = require("nodemailer");

// const mailSender = async (email, title, body) => {
//     try{
//         let transporter = nodemailer.createTransport({
//             host: process.env.MAIL_HOST, 
//             port: 465,
//             secure: true,
//             auth:{
//                 user:process.env.MAIL_USER,
//                 pass:process.env.MAIL_PASS
//             }
//         })

//         let info = await transporter.sendMail({
//             from: "StudyNotion - By Apurva Rawat",
//             to:`${email}`,
//             subject:`${title}`,
//             html:`${body}`,
//         })
//         console.log(info);
//         return info;

//     }
//     catch(err){
//         console.log(err.message);
//         throw err;
//     }
// }

// module.exports = mailSender;






const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,   // e.g. smtp.gmail.com
      port: 587,                     // ✅ use 587
      secure: false,                 // ✅ false for STARTTLS
      auth: {
        user: process.env.MAIL_USER, // your gmail address
        pass: process.env.MAIL_PASS  // your app password
      },
      tls: {
        rejectUnauthorized: false,   // ✅ helps avoid self-signed issues in cloud
      },
    });

    let info = await transporter.sendMail({
      from: `"StudyNotion - By Apurva Rawat" <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
    });

    console.log("✅ Email sent:", info.messageId);
    return info;
  } catch (err) {
    console.error("❌ SMTP error:", err.message);
    throw err;
  }
};

module.exports = mailSender;
