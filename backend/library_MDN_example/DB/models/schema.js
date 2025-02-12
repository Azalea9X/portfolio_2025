const mongoose = require('mongoose');
const moment = require('moment');
const password = process.env.db_password || "asdfsdfWERWE11111rRRRR#";
const encodedPassword = encodeURIComponent(password);

const uri = `mongodb+srv://jsiegel003:${encodedPassword}@cluster0.lfcmu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const Schema = mongoose.Schema;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

module.exports.connection = mongoose;

// Define the schema
const AuthorSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  email: { type: String, unique: true },
  age: Number,
  date_of_birth: 
  {type: Date, 
        validate: {
      validator: function (value) {
        return moment().diff(value, "years") >= 18;
      },
      message: "Age must be at least 18.",
    },
  },
  date_of_death: 
  {type: Date, 
        validate: {
      validator: function (value) {
        return moment().diff(value, "years") >= 18;
      },
      message: "Age must be at least 18.",
    },
  },
  address: String
});

// Create a model using the schema
const Author = mongoose.model("Author", AuthorSchema);

module.exports.authors = Author;

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Author", required: true },
  summary: { type: String, required: true },
  isbn: { type: String, required: true },
  genre: [{ type: mongoose.Schema.Types.ObjectId, ref: "Genre" }],
});

// Virtual for book's URL
BookSchema.virtual("url").get(function () {
  return `/catalog/book/${this._id}`;
});

// Export model
const Book = mongoose.model("Book", BookSchema);

module.exports.books = Book;

// Save new book to database
(async () => {
  try {
    console.log("Book saved successfully!");

    await Book.countDocuments().then((data) => {
      console.log(`Total books: ${data}`);
    });
  } catch (error) {
    console.error("Error saving book:", error);
  }
})();

// Define the schema
const BookInstanceSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true
  },
  imprint: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ["Available", "Maintenance", "Loaned", "Reserved"],
    default: "Maintenance"
  },
  due_back: {
    type: Date,
    default: Date.now
  }
});

// Virtual for bookinstance's URL
BookInstanceSchema.virtual("url").get(function () {
  return `/catalog/bookinstance/${this._id}`;
});

BookInstanceSchema.virtual("due_back_yyyy_mm_dd").get(function () {
  return moment(this.due_back).format('YYYY-MM-DD');
});

// Export model
const BookInstance = mongoose.model("bookinstances", BookInstanceSchema);

module.exports.bookinstance = BookInstance;

// Define the schema
const GenreSchema = new mongoose.Schema({
  name: { type: "String", required: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
});

// Virtual for genre's URL
GenreSchema.virtual("url").get(function () {
  return `/catalog/genre/${this._id}`;
});

// Export model
const Genre = mongoose.model("genres", GenreSchema);

module.exports.genres = Genre;
