import nodemailer from 'nodemailer';

module.exports.sendRecoverPassLink = (token, sendTo) => {
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
        html: '<p>To complete update password click <a href="http://localhost:3000/recover/' + token + '">here</a></p>'
    };

    transporter.sendMail(mailOptions);
};