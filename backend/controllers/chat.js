const Chat = require('../models/Chat');
const fs = require('fs');

exports.createChat = (req, res, next) => {
    const chatObject = req.body.chat;
    delete chatObject._id;
    delete chatObject._userId;
    delete chatObject._creationDate;




    const chat = new Chat({
        ...chatObject,
        userId: "req.auth.userId",
        topicId: req.params.topicId
    });
    chat.save()
        .then(() => { res.status(201).json({ message: 'Chat enregistré !' }) })
        .catch(error => { res.status(400).json({ error }) });





};

exports.getOneChat = (req, res, next) => {
    Chat.findOne({
        _id: req.params.id
    }).then(
        (chat) => {
            res.status(200).json(chat);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};





exports.getAllChats = (req, res, next) => {
    Chat.find({ topicId: req.params.topicId }).then(
        (chats) => {
            res.status(200).json(chats);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};