const mongoose = require("mongoose");
let book2 = require("../DB/models/schema").books;
let Authors = require("../DB/models/schema").authors; 
let Genres = require("../DB/models/schema").genres;
let Bookinstance = require("../DB/models/schema").bookinstance;

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const validators = [
  // Validate that the name field is not empty.
  body("name", "Genre name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
    body("book", "Must be at least 3 characters long")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .isString()

  // …
];

// Display list of all Genre.// Display list of all Genres.
exports.genre_list = asyncHandler(async (req, res, next) => {
  res.render("genre_list", {
    title: "Genre List",
    author_list: await Authors.find().exec(),
    genre_list: await Genres.find({
      sort: { name: 1 }, // Sort by name in ascending order.
      populate: { path: "author" }, // Populate the author field with author details.
    }).exec(),
  });
});

  
  // Display detail page for a specific Genre.
  exports.genre_detail = asyncHandler(async (req, res, next) => {
    // Get details of genre and all associated books (in parallel)
    const [genre, booksInGenre] = await Promise.all([
      Genres.find().exec(),
      book2.find({ genre: req.params.id }, "title summary").exec(),
    ]);
    if (genre === null) {
      // No results.
      const err = new Error("Genre not found");
      err.status = 404;
      return next(err);
    }
  
    res.render("genre_detail", {
      title: "Genre Detail",
      genre: genre,
      genre_books: booksInGenre,
    });
  });
  
  // Display Genre create form on GET.// Display Genre create form on GET.
// Display Genre create form on GET.
exports.genre_create_get = asyncHandler(async (req, res, next) => {
  // Extract the validation errors from a request.
  const errors = validationResult(req);

  // Create a genre object with escaped and trimmed data.
  const genre = new Genres({ name: req.body.name, book: req.body.book });

  if (!errors.isEmpty()) {
    // There are errors. Render the form again with sanitized values/error messages.
    res.render("genre_form", {
      title: "Create Genre",
      genre: genre,
      errors: errors.array(),
    });
    return;
  } else {
    // Data from form is valid.
    res.render("genre_form", {
      title: "Create Genre",
      genre: null,
      errors: null,
    });
  }
});

// Handle Genre create on POST.
// Handle Genre create on POST.
exports.genre_create_post = [
  // Validate and sanitize the name field.
 ...validators,

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a genre object with escaped and trimmed data.
    const genre = new Genres({ name: req.body.name, 
      book: req.body.book
     });
await genre.save();
    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("genre_form", {
        title: "Create Genre",
        genre: genre,
        errors: errors.array(),
      });
      return;
    }

    // Data from form is valid.
    // Check if Genre with same name already exists.
    const genreExists = await Genres.findOne({ name: req.body.name })
      .collation({ locale: "en", strength: 2 })
      .exec();
  })]
   
  
  // Handle Genre create on POST.
 // Display Genre delete form on GET.
exports.genre_delete_get = asyncHandler(async (req, res, next) => {
  try {
    const genre = await Genres.findById(req.params.id);
    if (genre) {
      res.render('genre_delete', { title: 'Delete Genre', genre: genre });
    } else {
      res.redirect('/catalog/genres');
    }
  } catch (err) {
    next(err);
  }
});

// Handle Genre delete on POST.
exports.genre_delete_post = asyncHandler(async (req, res, next) => {
  try {
    const genre = await Genres.findById(req.body.id);
    if (genre) {
      await genre.remove();
      res.redirect('/catalog/genres');
    } else {
      res.redirect('/catalog/genres');
    }
  } catch (err) {
    next(err);
  }
});

// Display Genre update form on GET.
exports.genre_update_get = asyncHandler(async (req, res, next) => {
  try {
    const genre = await Genres.findById(req.params.id);
    if (genre) {
      res.render('genre_form', { title: 'Update Genre', genre: genre });
    } else {
      res.redirect('/catalog/genres');
    }
  } catch (err) {
    next(err);
  }
});

// Handle Genre update on POST.
exports.genre_update_post = asyncHandler(async (req, res, next) => {
  try {
    const genre = await Genres.findById(req.params.id);
    if (genre) {
      genre.name = req.body.name;
      await genre.save();
      res.redirect(genre.url);
    } else {
      res.redirect('/catalog/genres');
    }
  } catch (err) {
    next(err);
  }
});