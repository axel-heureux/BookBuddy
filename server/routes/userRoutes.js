const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const favoriteController = require('../controllers/favoriteController');
const auth = require('../middleware/authMiddleware');

// Protège toutes les routes sensibles avec auth
router.get('/', auth, userController.getUsers);
router.get('/profile', auth, userController.getProfile);
router.get('/booksread', auth, userController.getBooksRead);
router.get('/:id', auth, userController.getUserById);
router.put('/:id', auth, userController.updateUser);
router.delete('/:id', auth, userController.deleteUser);
router.post('/:userId/favorites', auth, favoriteController.addFavoriteBook);
router.delete('/:userId/favorites/:bookId', auth, favoriteController.removeFavoriteBook);
router.put('/:userId/progress/:bookId', auth, userController.updateReadingProgress);
router.post('/logout', auth, userController.logoutUser); // Déconnexion de l'utilisateur
router.post('/:id/rewards', auth, userController.addRewardToUser);

// Routes publiques
router.post('/', userController.createUser);
router.post('/login', userController.loginUser);

// Route de test 401
router.get('/unauthorized', (req, res) => {
  res.status(401).json({ message: 'Token invalide ou manquant' });
});

module.exports = router;
