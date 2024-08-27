const express = require('express');
const router = express.Router();

const books = require('../controllers/books.controller.js');
const loans = require('../controllers/loans.controller.js')

router.post('/books/create', books.createBook);
router.get('/books/onebyid/:id', books.getBookById);
router.get('/books/retriveAll', books.retriveAllBooks);
router.put('/books/updatebyid/:id', books.updateBookById);
router.delete('/books/delete/:id', books.deleteBookById);

router.post('/loans/create', loans.createLoan);
router.get('/loans/onebyid/:id', loans.getLoanById);
router.get('/loans/retriveAll', loans.retriveAllLoans);
router.put('/loans/updatebyid/:id', loans.updateById);
router.delete('/loans/delete/:id', loans.deleteById);

module.exports = router;