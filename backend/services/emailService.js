const nodemailer = require('nodemailer');

// Créer un transporter Nodemailer avec les configurations SMTP de o2switch
const transporter = nodemailer.createTransport({
    host: 'ariane.o2switch.net', // Serveur sortant (SMTP) fourni par o2switch
    port: 465, // Port pour SSL
    secure: true, // Utiliser SSL
    auth: {
        user: 'hackathon@chokbar.fr', // Votre adresse e-mail complète
        pass: 'hackathon69' // Mot de passe de votre compte e-mail
    }
});

// Exemple de fonction pour envoyer un email
const sendEmail = async (to, subject, htmlContent) => {
    const mailOptions = {
        from: 'hackathon@chokbar.fr', // Doit correspondre à 'auth.user'
        to: to,
        subject: subject,
        html: htmlContent,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Failed to send email', error);
    }
};

module.exports = { sendEmail };
