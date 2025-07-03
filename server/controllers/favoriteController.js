const User = require('../models/user');
const axios = require('axios');

// Ajouter un livre aux favoris
exports.addFavoriteBook = async (req, res) => {
  try {
    const { userId } = req.params;
    const { bookId } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    // Vérifie si déjà en favoris
    const already = user.favorites.find(
      fav => fav.book.toString() === bookId
    );
    if (already) {
      return res.status(400).json({ message: 'Déjà en favoris' });
    }

    user.favorites.push({ book: bookId });
    await user.save();

    res.json({ message: 'Ajouté aux favoris', favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Supprimer un livre des favoris
exports.removeFavoriteBook = async (req, res) => {
  try {
    const { userId, bookId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    // Si favorites est un tableau d'objets { book: ObjectId, ... }
    user.favorites = user.favorites.filter(
      fav => fav.book.toString() !== bookId && fav.book !== bookId
    );
    await user.save();

    res.json({ message: 'Livre retiré des favoris', favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

