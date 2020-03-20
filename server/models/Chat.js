const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chatSchema = new Schema(
  {
    _doctor: { type: Schema.Types.ObjectId, ref: "User" },
    _user: { type: Schema.Types.ObjectId, ref: "User" },
    title: String
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)

const Chat = mongoose.model('Chat', chatSchema)
module.exports = Chat
