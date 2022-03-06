const nodemailer = require("nodemailer");

exports.mail = async (email, subject, data) => {
  console.log("Function called");
  let transporter = await nodemailer.createTransport({
    service: "Gmail",
    host: "smpt.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "mymediambulance@gmail.com",
      pass: "mymediambulance@11",
    },
  });
  var mailOption = {
    from: "medicalhelp@gmail.com",
    to: email,
    subject: subject,
    html: data,
  };
  transporter.sendMail(mailOption, function (error, response) {
    if (error) {
      console.log("Mail not sent", error);
      return {
        mailSent: false,
        message: "Email not found",
      };
    } else {
      console.log("Mail sent", response);
      return {
        mailSent: true,
        message: "Email Send",
      };
    }
  });
};
