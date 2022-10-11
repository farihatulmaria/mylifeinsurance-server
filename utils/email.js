// WITH GMAIL
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

module.exports.sendMailWithGmail = async (mailInfo) => {
   const accessToken = await oAuth2Client.getAccessToken();

   let transporter = nodemailer.createTransport({
     service: "gmail",
     auth: {
       type: "OAuth2",
       user: process.env.SENDER_MAIL,
       clientId: process.env.CLIENT_ID,
       clientSecret: process.env.CLIENT_SECRET,
       refreshToken: process.env.REFRESH_TOKEN,
       accessToken: accessToken,
     },
   });

   const mailData = {
     from: process.env.SENDER_MAIL,
     to: mailInfo.to, // list of receivers
     subject: mailInfo.subject,
     text: mailInfo.text,
     html: `<h1>Hey there ${mailInfo.name} </h1>
              <p>This is the email for your insurance<p/>
              <p>Cover required For : ${mailInfo.data.coverFor}</p>
              <p>Type of insurance : ${mailInfo.data.insuranceType}</p>
              <p>Amount of Cover : ${mailInfo.data.amount}</p>
              <p>Cover Period : ${mailInfo.data.time}</p>
              <p>Coverage: ${mailInfo.coveAge}</p>
            `,
   };
   let info = await transporter.sendMail(mailData);

   console.log("Message sent: %s", info.messageId);

   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

   return info.messageId;
};