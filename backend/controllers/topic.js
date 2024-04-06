const Topic = require('../models/Topic');
const fs = require('fs');

exports.createTopic = (req, res, next) => {
    const topicObject = JSON.parse(req.body.topic);
    delete topicObject._id;
    delete topicObject._userId;
    delete topicObject._creationDate;

    // Determine the file type based on MIME type
    let fileType = '';
    if (req.file && req.file.mimetype) {
        const mimeType = req.file.mimetype;
        if (mimeType.startsWith('image/')) {
            fileType = 'img';
        } else if (mimeType.startsWith('video/')) {
            fileType = 'vid';
        } else {
            // Handle other file types or set a default
            fileType = 'other'; // or any default you prefer
        }
    }


    if (req.file) {
        const topic = new Topic({
            ...topicObject,
            userId: req.auth.userId,
            fileUrl: `${req.protocol}://${req.get('host')}/topicFiles/${req.file.filename}`,
            fileType: fileType
        });
        topic.save()
            .then(() => {
                res.status(201).json({ message: 'Objet enregistré !' });
                const io = req.app.get('io');
                io.emit('topicCreated');

            })
            .catch(error => { res.status(400).json({ error }) });

    }
    else {
        const topic = new Topic({
            ...topicObject,
            userId: req.auth.userId


        });
        topic.save()
            .then(() => {
                res.status(201).json({ message: 'Objet enregistré !' });
                const io = req.app.get('io');
                io.emit('topicCreated');
            })
            .catch(error => { res.status(400).json({ error }) });
    }




};

exports.getOneTopic = (req, res, next) => {
    Topic.findOne({
        _id: req.params.id
    }).then(
        (topic) => {
            res.status(200).json(topic);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};



exports.deleteTopic = (req, res, next) => {
    Topic.findOne({ _id: req.params.id })
        .then(topic => {
            if (topic.userId != req.auth.userId) {
                res.status(401).json({ message: 'Not authorized' });
            } else {
                const filename = topic.fileUrl.split('/topicFiles/')[1];
                fs.unlink(`topicFiles/${filename}`, () => {
                    Topic.deleteOne({ _id: req.params.id })
                        .then(() => { res.status(200).json({ message: 'Objet supprimé !' }) })
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};

exports.getAllTopics = (req, res, next) => {
    Topic.find({}, 'title _id fileUrl fileType').sort({ 'creationDate': -1 }).then(
        (topics) => {
            res.status(200).json(topics);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.upvoteTopic = (req, res, next) => {

}