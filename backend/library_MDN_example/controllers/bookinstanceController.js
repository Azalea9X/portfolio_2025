const mongoose = require("mongoose");  
let book2 = require("../DB/models/schema").books;
let Authors = require("../DB/models/schema").authors; 
let Genres = require("../DB/models/schema").genres;
let Bookinstance = require("../DB/models/schema").bookinstance;


const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const validators = [
  body("book", "Book must be specified").trim().isLength({ min: 1 }).escape(),
  body("imprint", "Imprint must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("status").escape(),
  body("due_back", "Invalid date")
    .optional({ checkFalsy: true }) // corrected 'values' to 'checkFalsy'
    .isISO8601()
    .toDate()
];

// Display list of all BookInstances.
exports.bookinstance_list = asyncHandler(async (req, res, next) => {
  try {
   const fetchBookInstances = async (req, res, next) => {
     // Delay for demonstration purposes.
     await new Promise((resolve) => setTimeout(resolve, 1000));
     return (async() => {
       return await Bookinstance.find()
        .populate("book")
        .populate("borrower")
        .populate("genre")
        .exec();
     })()

   }

    const bookInstances = await (fetchBookInstances); // Assuming delay is needed
    const title1 = "Book Instance List"; 
    res.render("bookinstance_list", { title: title1, bookinstance_list: bookInstances });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});



// Display detail page for a specific BookInstance.
// Display detail page for a specific BookInstance.
exports.bookinstance_detail = asyncHandler(async (req, res, next) => {
  const bookInstance = await Bookinstance.findById(req.params.id)
    .populate("book")
    .exec();

  if (bookInstance === null) {
    // No results.
    const err = new Error("Book copy not found");
    err.status = 404;
    return next(err);
  }

  res.render("bookinstance_detail", {
    title: "Book:",
    bookinstance: bookInstance,
  });
});


// Display BookInstance create form on GET.
exports.bookinstance_create_get = asyncHandler(async (req, res, next) => {
  const allBooks = await book2.find({}, "title").sort({ title: 1 }).exec();

  res.render("bookinstance_form", {
    title: "Create BookInstance",
    book_list: allBooks,
  });
});



// Handle BookInstance create on POST.
exports.bookinstance_create_post = [
  // Validate and sanitize fields.
...validators
  ,

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a BookInstance object with escaped and trimmed data.
    const bookInstance = new BookInstance({
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      due_back: req.body.due_back,
    });

    if (!errors.isEmpty()) {
      // There are errors.
      // Render form again with sanitized values and error messages.
      const allBooks = await book2.find({}, "title").sort({ title: 1 }).exec();

      res.render("bookinstance_form", {
        title: "Create BookInstance",
        book_list: allBooks,
        selected_book: bookInstance.book._id,
        errors: errors.array(),
        bookinstance: bookInstance,
      });
      return;
    } else {
      // Data from form is valid
      await bookInstance.save();
      res.redirect(bookInstance.url);
    }
  }),
];



// Display BookInstance delete form on GET.
exports.bookinstance_delete_get = asyncHandler(async (req, res, next) => {
  try {
    const bookinstance = await Bookinstance.findById(req.params.id);
    if (bookinstance) {
      res.render('bookinstance_delete', { title: 'Delete BookInstance', bookinstance: bookinstance });
    } else {
      res.redirect('/catalog/bookinstances');
    }
  } catch (err) {
    next(err);
  }
});

// Handle BookInstance delete on POST.
exports.bookinstance_delete_post = asyncHandler(async (req, res, next) => {
  try {
    const bookinstance = await Bookinstance.findById(req.body.bookinstanceid);
    if (bookinstance) {
      await Bookinstance.remove();
      res.redirect('/catalog/bookinstances');
    } else {
      res.redirect('/catalog/bookinstances');
    }
  } catch (err) {
    next(err);
  }
});

// Display BookInstance update form on GET.
exports.bookinstance_update_get = asyncHandler(async (req, res, next) => {
  try {
    const bookinstance = await Bookinstance.findById(req.params.id);
    if (bookinstance) {
      const allBooks = await book2.find({}, 'title').sort({ title: 1 }).exec();
      res.render('bookinstance_form', { title: 'Update BookInstance', book_list: allBooks, selected_book: bookinstance.book._id, bookinstance: bookinstance });
    } else {
      res.redirect('/catalog/bookinstances');
    }
  } catch (err) {
    next(err);
  }
});

// Handle bookinstance update on POST.
exports.bookinstance_update_post = asyncHandler(async (req, res, next) => {
  try {
    const bookinstance = await BookInstance.findById(req.params.id);
    if (bookinstance) {
      Bookinstance.book = req.body.book;
      Bookinstance.imprint = req.body.imprint;
      Bookinstance.status = req.body.status;
      Bookinstance.due_back = req.body.due_back;
      await Bookinstance.save();
      res.redirect(Bookinstance.url);
    } else {
      res.redirect('/catalog/bookinstances');
    }
  } catch (err) {
    next(err);
  }
});