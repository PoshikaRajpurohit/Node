const nodemailer = require("nodemailer");

const sendEmail = async(data) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false, 
    auth: {
      user: "7466poshikarajpurohit@gmail.com",
      pass: "iuubqcnzazkjgtir",
    },
  });

  let res = await transporter.sendMail(data);
  if(res){
    console.log("Email Response: ", res);
    return res;
  }else{
    console.log("Email is not Send");
  }

};

module.exports = sendEmail;