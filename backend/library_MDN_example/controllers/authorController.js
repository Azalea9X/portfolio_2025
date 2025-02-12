const mongoose = require("mongoose");
let book2 = require("../DB/models/schema").books;
let Authors = require("../DB/models/schema").authors; 
let Genres = require("../DB/models/schema").genres;
let Bookinstance = require("../DB/models/schema").bookinstance;

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const validators = [
  body("first_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified.")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters."),
  body("last_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Family name must be specified.")
    .isAlphanumeric()
    .withMessage("Family name has non-alphanumeric characters."),
  body("email", "Invalid email")
    .optional()
    .isEmail()
  
    .isString(),
  body("date_of_death", "Invalid date of death")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate()
];

// Display list of all Authors.
exports.author_list = asyncHandler(async (req, res, next) => {
  const allAuthors = await Author.find().sort({ name: -1 }).exec();
  res.render("author_list", {
    title: "Author List",
    author_list: allAuthors,
  });
});
// Display detail page for a specific Author.
// Display detail page for a specific Author.
exports.author_detail = asyncHandler(async (req, res, next) => {
  // Get details of author and all their books (in parallel)
  const [author, allBooksByAuthor] = await Promise.all([
    Authors.findById(req.params.id).exec(),
    book2.find({ author: req.params.id }, "title summary").exec(),
  ]);

  if (author === null) {
    // No results.
    const err = new Error("Author not found");
    err.status = 404;
    return next(err);
  }

  res.render("author_detail", {
    title: "Author Detail",
    author: author,
    author_books: allBooksByAuthor,
  });
});


// Display Author create form on GET.
// Display Author create form on GET.
exports.author_create_get = (req, res, next) => {
  res.render("author_form", { title: "Create Author" });
};


// Handle Author create on POST.
exports.author_create_post = [
  // Validate and sanitize fields.
  ...validators
  
  ,

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create Author object with escaped and trimmed data
    const author1 = new Authors({
      /* fname: String,
  lname: String,
  email: { type: String, unique: true },
  age: Number,
  address: String*/
  fname: req.body.first_name, 
  lname: req.body.last_name, 
  email: req.body.email,
      age: req.body.age,
      address: req.body.address,
    
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render("author_form", {
        title: "Create Author",
        author: author1,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.

      // Save author.
      await author1.save();
      // Redirect to new author record.
      res.redirect("/catalog");
    }
  }),
];


// Display Author delete form on GET.
// Display Author delete form on GET.
exports.author_delete_get = asyncHandler(async (req, res, next) => {
  // Get details of author and all their books (in parallel)
  const [author, allBooksByAuthor] = await Promise.all([
    Authors.findById(req.params.id).exec(),
    book2.find({ author: req.params.id }, "title summary").exec(),
  ]);

  if (author === null) {
    // No results.
    res.redirect("/catalog/authors");
  }

  res.render("author_delete", {
    title: "Delete Author",
    author: author,
    author_books: allBooksByAuthor,
  });
});


// Handle Author delete on POST.
// Handle Author delete on POST.
exports.author_delete_post = asyncHandler(async (req, res, next) => {
  // Get details of author and all their books (in parallel)
  const [author, allBooksByAuthor] = await Promise.all([
    Authors.findById(req.params.id).exec(),
    book2.find({ author: req.params.id }, "title summary").exec(),
  ]);

  if (allBooksByAuthor.length > 0) {
    // Author has books. Render in same way as for GET route.
    res.render("author_delete", {
      title: "Delete Author",
      author: author,
      author_books: allBooksByAuthor,
    });
    return;
  } else {
    // Author has no books. Delete object and redirect to the list of authors.
    await Authors.findByIdAndDelete(req.body.id);
    res.redirect("/catalog/authors");
  }
});

// Display Author update form on GET.
exports.author_update_get = asyncHandler(async (req, res, next) => {
  try {
    const author = await Authors.findById(req.params.id);
    if (author) {
      res.render('author_form', { title: 'Update Author', author: author });
    } else {
      res.redirect('/catalog/authors');
    }
  } catch (err) {
    next(err);
  }
});

// Handle Author update on POST.
exports.author_update_post = asyncHandler(async (req, res, next) => {
  try {
    const author = await Authors.findById(req.params.id);
    if (author) {
      author.first_name = req.body.fname;
      author.last_name = req.body.lname;
      author.date_of_birth = req.body.dob;
      author.date_of_death = req.body.dod;
      await author.save();
      res.redirect(author.url);
    } else {
      res.redirect('/catalog/authors');
    }
  } catch (err) {
    next(err);
  }
});