const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  message: String,
  emotion: String,
  score: Number
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);
