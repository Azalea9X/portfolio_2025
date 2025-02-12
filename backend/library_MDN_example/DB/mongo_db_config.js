const dotenv = require("dotenv");
dotenv.config(); 

const mongoose = require('mongoose');
const password = process.env.db_password || "asdfsdfWERWE11111rRRRR#";
const encodedPassword = encodeURIComponent(password);

const uri = `mongodb+srv://jsiegel003:${encodedPassword}@cluster0.lfcmu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;



mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

  const Schema = mongoose.Schema;

  
// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Book = require("./models/book");
const Author = require("./models/author");
const Genre = require("./models/genre");
const BookInstance = require("./models/bookinstance");

const genres = [];
const authors = [];
const books = [];
const bookinstances = [];


mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createGenres();
  await createAuthors();
  await createBooks();
  await createBookInstances();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}


  module.exports = mongoose; 