const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema(
  {
    _chat: { type: Schema.Types.ObjectId, ref: "Chat" },
    _creator: { type: Schema.Types.ObjectId, ref: "User" },
    content: String
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)

const Message = mongoose.model('Message', messageSchema)
module.exports = Message
