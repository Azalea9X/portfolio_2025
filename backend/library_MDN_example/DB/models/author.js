const mongoose = require("./schema").mongoose;
const Schema = require("./schema").Schema;

// Define the schema
const AuthorSchema = new Schema({
  fname: String,
  lname: String,
  email: { type: String, unique: true },
  age: Number,
  address: String
});

// Create a model using the schema
const Author = mongoose.model('authors', AuthorSchema);

// Create a document for Test1
 
// Save the new document
//newAuthor.save();

module.exports = Author;
