const express = require('express')
const Chat = require('../models/Chat')
const Message = require('../models/Message')

const router = express.Router()

router.get('/noChatDoctor', (req, res, next) => {
  console.log("noChatDoctor")
  Chat.find({ _doctor: null })
    .then(chats => {
      console.log("answer", chats)
      res.json(chats)
    })
    .catch(err => next(err))
})

router.get('/chatByDoctor', (req, res, next) => {
  Chat.find({ _doctor: req.user._id })
    .then(chats => {
      res.json(chats)
    })
    .catch(err => next(err))
})

router.get('/chatByUser', (req, res, next) => {
  Chat.find({ _user: req.user._id })
    .then(chats => {
      res.json(chats)
    })
    .catch(err => next(err))
})

router.get('/messagesToChat/:chatId', (req, res, next) => {
  let chatId = req.params.chatId
  Message.find({ _chat: chatId })
    .then(messages => {
      res.json(messages)
    })
    .catch(err => next(err))
})


router.post('/newChat', (req, res, next) => {//user creates new message and chat by this
  let { content, title } = req.body
  Chat.create({
    _user: req.user._id,
    title: title
  })
    .then(chat => {
      console.log("created Chat", chat)
      Message.create({
        _chat: chat._id,
        _creator: req.user._id,
        content: content
      })
        .then(message => {
          res.json({
            success: true,
            message,
            chat
          })
        })
        .catch(err => next(err))
    })
    .catch(err => next(err))
})

router.post('/newMessagetoChat/:chatId', (req, res, next) => {//user or doctor creates new message in chat
  let { content } = req.body
  let chatID = req.params.chatId
  Message.create({
    _chat: chatID,
    _creator: req.user._id,
    content: content
  })
    .then(message => {
      res.json({
        success: true,
        message
      })
    })
    .catch(err => next(err))
})

router.post('/addDoctorToChat/:chatId', (req, res, next) => {//doctor takes on a chat to answer
  let id = req.params.chatId
  Chat.findByIdAndUpdate(id, {
    _doctor: req.user._id
  })
    .then(chat => {
      res.json({
        success: true,
        chat
      })
    })
    .catch(err => next(err))
})

module.exports = router
