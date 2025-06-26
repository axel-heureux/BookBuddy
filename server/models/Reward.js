// models/Recompense.js
const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema({
  nom:        { type: String, required: true },
  description:{ type: String },
  cout:       { type: Number, required: true }, // en points
  image:      { type: String } // optionnel : URL de l'image
}, {
  timestamps: true
});

module.exports = mongoose.model('Recompense', rewardSchema);
