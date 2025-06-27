const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

// Ajouter un livre aux favoris (protégé)
router.post('/:userId/favorites', auth, userController.addFavoriteBook);

// Retirer un livre des favoris (protégé)
router.delete('/:userId/favorites/:bookId', auth, userController.removeFavoriteBook);

module.exports = router;