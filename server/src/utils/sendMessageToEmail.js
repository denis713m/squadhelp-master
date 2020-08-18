import nodemailer from 'nodemailer';

module.exports.sendMessageToEmail = (message, sendTo) => {
    const transporter = nodemailer.createTransport({
        service: 'yahoo',
        auth: {
            user: 'squad.den@yahoo.com',
            pass: 'vmydwvnoeeqweewh'
        }
    });

    const mailOptions = {
        from: 'squad.den@yahoo.com',
        to: sendTo,
        subject: 'Email from SquadHelp',
        html: message
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            throw new Error("Can't send email");
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};