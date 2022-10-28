// books.js, Egor, Student # 301179880, COMP229_MidTerm

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {

  // all books in the collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});



//  GET the Book Details page in order to add a new Book
 router.get('/add', (req, res, next) => {

    // GET render path to book/details page with "add book" title
     res.render('books/details', {title: 'Add Book', books: '' }) 
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    // POST create a new Book - CREATE
     let newBook = book({
      "Title": req.body.title,
      "Description": req.body.description,
      "Price": req.body.price,
      "Author": req.body.author,
      "Genre": req.body.genre
     
  });

  // create book, error handler and refresh the book list
  book.create(newBook, (err, book) =>{
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
          // refresh the list
          res.redirect('/books');
      }
  }); 

}); 

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

    // init id
     let id = req.params.id;

     // find book by ID, error handler
    book.findById(id, (err, bookToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit book
            res.render('books/details', {title: 'Edit Book', books: bookToEdit })
        }
    });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
     let id = req.params.id

        // book update
     let updatedBook = book({
         "_id": id,
         "Title": req.body.title,
         "Description": req.body.description,
         "Price": req.body.price,
         "Author": req.body.author,
         "Genre": req.body.genre
     });
 
     book.updateOne({_id: id}, updatedBook, (err) => {
         if(err)
         {
             console.log(err);
             res.end(err);
         }
         else
         {
             // refresh the Book list
             res.redirect('/books');
         }
     });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
     let id = req.params.id;

        // remove a book
     book.remove({_id: id}, (err) => {
         if(err)
         {
             console.log(err);
             res.end(err);
         }
         else
         {
             // refresh the Book list
             res.redirect('/books');
         }
     });

});


module.exports = router;
