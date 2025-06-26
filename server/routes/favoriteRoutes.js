// POST /users/:userId/favorites   (ajouter un livre aux favoris)
router.post('/:userId/favorites', userController.addFavoriteBook);

// DELETE /users/:userId/favorites/:bookId   (retirer un livre des favoris)
router.delete('/:userId/favorites/:bookId', userController.removeFavoriteBook);