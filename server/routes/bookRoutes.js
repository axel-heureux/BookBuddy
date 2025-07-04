const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const auth = require('../middleware/authMiddleware');

router.get('/', bookController.getBooks);
router.get('/:id', bookController.getBookById);
router.post('/',  bookController.createBook);
router.put('/:id',  bookController.updateBook);
router.delete('/:id',  bookController.deleteBook);

// // Routes sensibles protégées
// router.post('/', auth, bookController.createBook);
// router.put('/:id', auth, bookController.updateBook);
// router.delete('/:id', auth, bookController.deleteBook);

module.exports = router;
