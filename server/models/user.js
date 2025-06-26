// models/User.js
const mongoose = require('mongoose');

const favoriteBookSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Livre', required: true },
  addedAt: { type: Date, default: Date.now }
});

const booksReadSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Livre', required: true },
  progress: { type: Number, default: 0 } // nombre de pages lues ou pourcentage
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  points:   { type: Number, default: 0 },
  booksRead: [booksReadSchema],
  rewards:   [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recompense' }],
  favorites: [favoriteBookSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
