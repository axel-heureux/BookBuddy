const User = require('../models/user');

// Ajouter un livre aux favoris
exports.addFavoriteBook = async (req, res) => {
  try {
    const { userId } = req.params;
    const { bookId } = req.body;

    if (!bookId) {
      return res.status(400).json({ message: 'bookId is required' });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Vérifie si déjà en favoris
    const alreadyFavorite = user.favorites.some(fav => fav.book.toString() === bookId);
    if (alreadyFavorite) {
      return res.status(400).json({ message: 'Book already in favorites' });
    }

    user.favorites.push({ book: bookId });
    await user.save();

    res.status(201).json(user.favorites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Supprimer un livre des favoris
exports.removeFavoriteBook = async (req, res) => {
  try {
    const { userId, bookId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const initialLength = user.favorites.length;
    user.favorites = user.favorites.filter(fav => fav.book.toString() !== bookId);

    if (user.favorites.length === initialLength) {
      return res.status(404).json({ message: 'Book not found in favorites' });
    }

    await user.save();
    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};