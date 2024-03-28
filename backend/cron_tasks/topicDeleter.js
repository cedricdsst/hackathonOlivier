const cron = require('node-cron');
const Topic = require('../models/Topic'); // Assurez-vous d'importer vos modèles Mongoose correctement
const Message = require('../models/Chat');

async function cleanupExpiredTopics() {
    const now = new Date();
    const expiredDate = new Date(now.getTime() - (24 * 60 * 60 * 1000)); // Calcule 24 heures avant maintenant

    // Trouvez tous les topics expirés
    const expiredTopics = await Topic.find({ creationDate: { $lte: expiredDate } });

    for (const topic of expiredTopics) {
        // Supprimez tous les messages liés à ce topic
        await Message.deleteMany({ topicId: topic._id });
        // Puis supprimez le topic lui-même
        await Topic.deleteOne({ _id: topic._id });
    }

    console.log('Nettoyage des topics expirés effectué.');
}

// Planifiez la tâche de nettoyage pour s'exécuter toutes les minutes
cron.schedule('* * * * *', cleanupExpiredTopics);
