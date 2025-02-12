const mongoose = require("mongoose");  
let book2 = require("../DB/models/schema").books;
let Authors = require("../DB/models/schema").authors; 
let Genres = require("../DB/models/schema").genres;
let Bookinstance = require("../DB/models/schema").bookinstance;
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");


// Home page
exports.index = asyncHandler(async (req, res, next) => {
  try {
    const [
      numBooks,
      numBookInstances,
      numAvailableBookInstances,
      numAuthors,
      numGenres,
    ] = await Promise.all([
      book2.countDocuments(),
      Bookinstance.countDocuments(),
      Bookinstance.countDocuments().sort({
 
      }),
      Authors.countDocuments(),
      Genres.countDocuments(),
    ]);
res.render("index", {
  title: "Local Library Home",
  numBooks: numBooks,
  numBookInstances: numBookInstances,
  numAvailableBookInstances: numAvailableBookInstances,
  author_count: numAuthors,
  genre_count: numGenres,
})
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// Display list of all books
exports.book_list = asyncHandler(async (req, res, next) => {
  try {

    const books = await book2.find();
    res.render("book_list", { title: "Book List", book_list: books });

  }

  catch(err) {
    if (err) {
      console.error(err);
      next(err);
    }
  }
})

exports.book_create_get = asyncHandler(async(req, res, next ) => {
  // Get all authors and genres for form.
  const [allAuthors, allGenres] = await Promise.all([
    Authors.find().sort({ last_name: 1 }).exec(),
    Genres.find().sort({ name: 1 }).exec(),
  ]);
  res.render("book_form", {
    title: "Create Book",
    authors: allAuthors,
    genres: allGenres,
  });
})
// Display detail page for a specific book
// Display detail page for a specific book.
exports.book_detail = asyncHandler(async (req, res, next) => {
  // Get details of books, book instances for specific book
  const [book, bookInstances] = await Promise.all([
    book2.findById(req.params.id).populate("author").populate("genre").exec(),
    Bookinstance.find({ book: req.params.id }).exec(),
  ]);

  if (book === null) {
    // No results.
    const err = new Error("Book not found");
    err.status = 404;
    return next(err);
  }

  res.render("book_detail", {
    title: book.title,
    book: book,
    book_instances: bookInstances,
  });
});


// Display book create form on GET
// Display book create form o GET.
// Display book update form on GET.
exports.book_update_get = asyncHandler(async (req, res, next) => {
  // Get book, authors and genres for form.
  const [book, allAuthors, allGenres] = await Promise.all([
    book2.findById(req.params.id).populate("author").exec(),
    Authors.find().sort({ family_name: 1 }).exec(),
    Genres.find().sort({ name: 1 }).exec(),
  ]);

  if (book === null) {
    // No results.
    const err = new Error("Book not found");
    err.status = 404;
    return next(err);
  }

  // Mark our selected genres as checked.
  allGenres.forEach((genre) => {
    if (book.genre.includes(genre._id)) genre.checked = "true";
  });

  res.render("book_form", {
    title: "Update Book",
    authors: allAuthors,
    genres: allGenres,
    book: book,
  });
});


// Handle book create on POST
// Handle book create on POST.
//This works, but, I need to add a to-do item which involves me adding authors to the schema. 
exports.book_create_post = [
  // Convert the genre to an array.
  (req, res, next) => {
    if (!Array.isArray(req.body.genre)) {
      req.body.genre =
        typeof req.body.genre === "undefined" ? [] : [req.body.genre];
    }
    next();
  },

  // Validate and sanitize fields.
  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("author", "Author must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("summary", "Summary must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("isbn", "ISBN must not be empty").trim().isLength({ min: 1 }).escape(),
  body("genre.*").escape(),

  // Process request after validation and sanitization.

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Book object with escaped and trimmed data.
    const book1 = new book2({
      title: req.body.title,
      author: req.body.author.toString(), // Convert author to ObjectId
      summary: req.body.summary,
      isbn: req.body.isbn,
      genre: req.body.genre.map(genre => genre.toString()), // Convert genre to ObjectId
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      // Get all authors and genres for form.
      const [allAuthors, allGenres] = await Promise.all([
        Authors.find().sort({ fname: 1 }).exec(),
        Genre.find().sort({ name: 1 }).exec(),
      ]);

      // Mark our selected genres as checked.
      for (const genre of allGenres) {
        if (book1.genre.includes(genre._id)) {
          genre.checked = "true";
        }
      }
      res.render("book_form", {
        title: "Create Book",
        authors: allAuthors,
        genres: allGenres,
        book: book1,
        errors: errors.array(),
      });
    } else {
      // Data from form is valid. Save book.
      await book1.save();
      res.redirect(book1.url);
    }
  }),
];


exports.book_update_post = asyncHandler(async(req, res, next) => {
  // Convert the genre to an array.
  if (!Array.isArray(req.body.genre)) {
    req.body.genre =
      typeof req.body.genre === "undefined"? [] : [req.body.genre];
  }
  // Extract the validation errors from a request.
  const errors = validationResult(req);
  // Create a Book object with escaped and trimmed data.
  const book1 = new book2({
    _id: req.params.id,
    title: req.body.title,
    author: req.body.author.toString(), // Convert author to ObjectId
    summary: req.body.summary,
    isbn: req.body.isbn,
    genre: req.body.genre.map(genre => genre.toString()), // Convert genre to ObjectId
  });
  if (!errors.isEmpty()) {
    // There are errors. Render form again with sanitized values/error messages.
    const [allAuthors, allGenres] = await Promise.all([
      Authors.find().sort({ fname: 1 }).exec(),
      Genre.find().sort({ name: 1 }).exec(),
    ]);
    // Mark our selected genres as checked.
    for (const genre of allGenres) {
      if (book1.genre.includes(genre._id)) {
        genre.checked = "true";
      }
    }
    res.render("book_form", {
      title: "Update Book",
      authors: allAuthors,
      genres: allGenres,
      book: book1,
      errors: errors.array(),
    });
  } else {
    // Data from form is valid. Update the book.
    await book1.save();
    res.redirect(book1.url);
  
    // Redirect to the book detail page.
  
    // Redirect to the book detail page.
    res.redirect(`/catalog/books/${book1._id}`);
  }

})
// Display book delete form on GET
exports.book_delete_get = asyncHandler(async (req, res, next) => {
  try {
    const book = await book2.findById(req.params.id).exec();
    if (book2 == null) {
      res.redirect("/catalog/books");
    }
    res.render("book_delete", { title: "Delete Book", book: book });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// Handle book delete on POST
exports.book_delete_post = asyncHandler(async (req, res, next) => {
  try {
    await book2.findByIdAndRemove(req.body.bookid);
    res.redirect("/catalog/books");
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// Display book update form on GET
exports.book_update_get = asyncHandler(async (req, res, next) => {
  try {
    const book = await book2.findById(req.params.id).exec();
    const authors = await Authors.find().exec();
    const genres = await Genres.find().exec();
    if (book == null) {
      const err = new Error("Book not found");
      err.status = 404;
      return next(err);
    }
    res.render("book_form", { title: "Update Book", book: book, authors: authors, genres: genres });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// Display book update form on GET.
exports.book_update_get = asyncHandler(async (req, res, next) => {
  // Get book, authors and genres for form.
  const [book, allAuthors, allGenres] = await Promise.all([
    book2.findById(req.params.id).populate("author").exec(),
    Authors.find().sort({ family_name: 1 }).exec(),
    Genres.find().sort({ name: 1 }).exec(),
  ]);

  if (book === null) {
    // No results.
    const err = new Error("Book not found");
    err.status = 404;
    return next(err);
  }

  // Mark our selected genres as checked.
  allGenres.forEach((genre) => {
    if (book.genre.includes(genre._id)) genre.checked = "true";
  });

  res.render("book_form", {
    title: "Update Book",
    authors: allAuthors,
    genres: allGenres,
    book: book,
  });
});

