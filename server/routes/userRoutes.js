const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const favoriteController = require('../controllers/favoriteController');

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/:userId/favorites', favoriteController.addFavoriteBook);
router.delete('/:userId/favorites/:bookId', favoriteController.removeFavoriteBook);
// Mettre à jour la progression de lecture d'un livre pour un utilisateur
router.put('/:userId/progress/:bookId', userController.updateReadingProgress);
router.post('/login', userController.loginUser);

module.exports = router;
