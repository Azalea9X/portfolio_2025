const mongoose = require('mongoose');
const password = process.env.db_password || "WRWER@#$@#$@#(@#(RI)WRE)(WERI)WEISFPISDFOSDF#";
const encodedPassword = encodeURIComponent(password);

const uri = `mongodb+srv://username:${encodedPassword}@clusterxxx.lfcmu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const Schema = mongoose.Schema;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

  module.exports.connection = mongoose; 


// Define the schema
const AuthorSchema = new Schema({
  fname: String,
  lname: String,
  email: { type: String, unique: true },
  age: Number,
  address: String
});

// Create a model using the schema


// Create a document for Test1
 
// Save the new document
//newAuthor.save();

// Find the document

module.exports.authors = mongoose.model("authors", AuthorSchema);

const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, ref: "Author", required: true },
  summary: { type: String, required: true },
  isbn: { type: String, required: true },
  genre: [{ type: String, ref: "Genre" }],
});

// Virtual for book's URL
BookSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/book/${this._id}`;
});

// Export model
const Book = mongoose.model("books", BookSchema);
 

// Save new book to database
(async () => {
  try {
 
    console.log("Book saved successfully!");

    await Book.countDocuments().then((data) => 
    {
      console.log(`Total books: ${data}`);
    })
  } catch (error) {
    console.error("Error saving book:", error);
  }
})()
module.exports.books = Book;

const BookInstanceSchema = new Schema({
  book: { type: String, ref: "Book", required: true }, // reference to the associated book
  imprint: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["Available", "Maintenance", "Loaned", "Reserved"],
    default: "Maintenance",
  },
  due_back: { type: Date, default: Date.now },
});

// Virtual for bookinstance's URL
BookInstanceSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/bookinstance/${this._id}`;
});

const BookInstance = mongoose.model("bookinstances", BookInstanceSchema);


//newBook.save(); 
// Export model
module.exports.bookinstance = BookInstance; 

 
const GenreSchema = new Schema({
  book: { type: String, ref: "Book", required: true }, // reference to the associated book
  genre: { type: String, required: true, enum: [ 
      "Fiction",
      "Non-Fiction",
      "Children's",
      "Mystery",
      "Romance",
      "Thriller",
      "Science Fiction",
      "History",
      "Biography",
      "Cookbook",
      "Children's Book",
      "Adult Fiction",
      "Poetry",
      "Graphic Novel",
      "Young Adult",
      "Fantasy",
      "Comic Book",
      "Art",
      "Self-Help",
      "Religion",
      "Health",
      "Parenting",
      "Spirituality",
      "Business",
      "Education",
      "Science",
      "Technology",
      "Engineering",
      "Medicine",
      "Law",
      "Politics",
      "Sports",
      "Travel",
      "Government",
      "World",
      "Family",
      "Animals",
      "Aviation",
      "Hobbies",
]},
 created_at: { type: Date, default: Date.now },
 updated_at: { type: Date, default: Date.now }

});

// Virtual for bookinstance's URL
GenreSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/bookinstance/${this._id}`;
});

// Export model
module.exports.genres = mongoose.model("GenreSchema", GenreSchema);