const { sendMailWithGmail } = require("../utils/email");

module.exports.sendEmail = async(req,res,next)=>{
    const name = req.body.name;
    const insuranceInfo = req.body.data;
    const coveAge = req.body.coveage;
    try {
        const mailData = {
            to: [insuranceInfo.email],
            subject: "Verify your Insurance",
            name:name,
            coveAge:coveAge,
            data:insuranceInfo,
            text: "Thank you for making the right decision.",
          };
        
        sendMailWithGmail(mailData);

        res.status(200).json({
            status:'passed',
            message:"Email sended",
        })
    } catch (err) {
        res.status(400).json({
            status:'You shall not pass',
            message:"Email not sended",
            error:err.message
        })
    }
}