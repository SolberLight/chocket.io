const express = require('express')
const mongoDB = require('mongodb')
const {ObjectID} = require("mongodb");

const router = express.Router()

const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/chocket'

// GET Messages
router.get('/messages', async (req, res) => {
    const chat = await loadChatCollection()

    res.send(await chat.find({}).toArray())
})

// POST Message
router.post('/message', async (req, res) => {
    const chat = await loadChatCollection()

    await chat.insertOne({
        message: req.body.message,
        username: req.body.username,
        sendAt: req.body.sendAt,
    })

    res.status(201).send()
})

// DELETE Message
router.delete('/message/:id', async (req, res) => {
    const chat = await loadChatCollection()

    await chat.deleteOne({ _id: ObjectID(req.params.id) })

    res.status(200).send()
})

async function loadChatCollection()
{
    const client = await mongoDB.MongoClient.connect(DATABASE_URL, {
        useNewUrlParser: true,
    })

    return client.db('chocket').collection('chat')
}

module.exports = router