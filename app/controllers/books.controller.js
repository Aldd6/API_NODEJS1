const db = require('../config/db.config.js');
const Book = db.Books;

exports.createBook = (req, res) => {
   try{
        let book = {};

        book.title = req.body.title;
        book.publisher = req.body.publisher;
        book.author = req.body.author;
        book.genre = req.body.genre;
        book.authorCountry = req.body.authorCountry;
        book.noPages = req.body.noPages;
        book.year = req.body.year;
        book.price = req.body.price;

        Book.create(book).then(result => {
            res.status(200).json({
                message: 'Book created successfully',
                book: result
            });
        });

   }catch(error) {
        res.status(500).json({
            message:'Failed to create book',
            error: error.message
        });
   }
}

exports.retriveAllBooks = (req, res) => {
    Book.findAll().then(booksInfo => {
        res.status(200).json({
            message: 'All books retrieved successfully',
            books: booksInfo
        });
    })
    .catch(error => {
        res.status(500).json({
            message: 'Failed to retrieve books',
            error: error.message
        });
    });
}

exports.getBookById = (req, res) => {
    let bookId = req.params.id;

    Book.findByPk(bookId).then(book => {
        res.status(200).json({
            message: 'Book retrieved successfully',
            book: book
        });
    })
    .catch(error => {
        res.status(404).json({
            message: 'Book not found',
            error: error.message
        });
    });
}

exports.updateBookById = async(req, res) => {
    let bookId = req.params.id;
    let book = await Book.findByPk(bookId);

    if(!book) {
        res.status(404).json({
            message: 'Book not found',
            book: " "
        })
    }else {
        let updateObject = {
            title: req.body.title,
            publisher: req.body.publisher,
            author: req.body.author,
            genre: req.body.genre,
            authorCountry: req.body.authorCountry,
            noPages: req.body.noPages,
            year: req.body.year,
            price: req.body.price,
        }

        let result = await Book.update(updateObject, {returning: true, where: {id: bookId}});

        if(!result) {
            res.status(500).json({
                message: 'Failed to update book',
                book: " "
            });
        }else {
            res.status(200).json({
                message: 'Book updated successfully',
                book: updateObject
            });
        }
    }
}

exports.deleteBookById = async(req, res) => {
    try {
        let bookId = req.params.id;
        let book = await Book.findByPk(bookId);

        if(!book) {
            res.status(404).json({
                message: 'Book not found',
                book: " "
            });
        }else {
            await book.destroy();
            res.status(200).json({
                message: 'Book deleted successfully',
                book: book
            });
        }
    }catch(error) {
        res.status(500).json({
            message: 'Failed to delete book',
            error: error.message
        });
    }
}