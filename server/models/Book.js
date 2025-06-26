// models/Livre.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  titre:      { type: String, required: true },
  auteur:     { type: String, required: true },
  categorie:  { type: String },
  pages:      { type: Number },
  couverture: { type: String }, // URL ou nom du fichier
  resume:     { type: String },
  description:{ type: String }, // Ajout du champ description
  disponible: { type: Boolean, default: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Livre', bookSchema);
