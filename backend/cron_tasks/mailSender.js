const cron = require('node-cron');
const Atelier = require('../models/Atelier');
const { sendEmail } = require('../services/emailService'); // Import the sendEmail function
const {emailRappelAtelier} = require('../emails/templates/emailRappelAtelier');

// Cron job to check for ateliers starting the next day
cron.schedule('0 0 * * *', () => { // This runs at midnight every day
    console.log('Running a daily check for ateliers starting tomorrow.');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0); // Ignore hours, minutes, seconds, and milliseconds

    const afterTomorrow = new Date(tomorrow);
    afterTomorrow.setDate(afterTomorrow.getDate() + 1);

    Atelier.find({
        startDate: {
            $gte: tomorrow,
            $lt: afterTomorrow
        },
        finished: false
    })
        .then(ateliers => {
            ateliers.forEach(atelier => {
                const participantEmails = atelier.participants.map(p => p.email);

                const subject = 'Rappel: N\'oubliez pas votre reservation à notre Atelier de dégustation !';
                const emailRappel = emailRappelAtelier(atelier.title, atelier.startDate, atelier.duration, atelier.adresse);

                participantEmails.forEach(email => {
                    sendEmail(email, subject, emailRappel);
                });
            });
        })
        .catch(error => {
            console.error('Failed to fetch ateliers:', error);
        });
});
