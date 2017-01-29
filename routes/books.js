var express = require('express'),
    router = express.Router();
	moment = require('moment');
	Book = require('../models/books');

function handleError(){
	res.status(500).json({
			title: 'Error',
			error: err
	}); 
}

router.get('/new', (req, res)=>{
	res.render('new')
});

router.post('/new', function(req, res){
	new Book({
		title: req.body.title,
		author: req.body.author,
		published: req.body.published,
		link: req.body.link,
		price: req.body.price,
		description: req.body.description,
		createDate: Date.now(),
	}).save(function(err, book, count){
		if(err){
			res.status(400).send('Error saving new Book' + err);
		}else{
			res.redirect('/books');
		}
	}
	)
});

router.get('/', function(req,res){
	Book.find( function(err, books, count){
		res.render('list', {books: books});
	})
});

router.route('/:book_id')
	.all(function(req, res,next){
		var book_id = req.params.book_id;
		Book.findById(book_id, function(err, b){
			res.locals.book = b
			next();
		});
	})
	.get(function (req, res){
		res.render('edit');
	})

	.post(function (req, res){
		var book_id = req.params.book_id;
		Book.findById(book_id, function(err, book){
			if(err){
				return res.send(err)
			}
			book.title = req.body.title
			book.author = req.body.author;
			book.published = req.body.published;
			book.link = req.body.link;
			book.price = req.body.price;
			book.description = req.body.description;
			book.updateDate = Date.now();

			book.save(function (err, book, count){
				if (err){
					res.status(400).send('Error saving contact:  ' + err);
				} else {
					res.redirect('/books');
				}
			});
		});
		
	})

	.delete(function (req, res){
		var book_id = req.params.book_id;
		Book.findById(book_id, function(err, book){
			if(err){
				return console.log(err)
			}
			book.remove(function (req,res){
				if(err){
					res.status(400).send("Error removing book " + err);
				}else {
					res.redirect('/books');
				}
			});

		});
	})
	

//middleware
//router.use('/',(req, res));

module.exports = router;