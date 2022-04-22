import React, { location, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import library_db from "../db_connect/sequelize_index"

const Book = library_db.book;
const Bookshelf = library_db.bookshelf;
const Room = library_db.room;

const queryString = require('query-string');

function MetadataEdit(props) {
  const [book, setBook] = useState("");
  let history = useNavigate();
  const useQuery = () => new URLSearchParams(useLocation().search);
  let query = useQuery();

  // console.log("rendering metadata page");

  var original_isbn = query.get("isbn")

  if( book == "" ){
    // console.log("had no book, getting new book");

    Book.findAll({
      where: {
        isbn: original_isbn },
      raw: true}).then((book) => {
      console.log("book: " + book)
      setBook(book[0])
    })
    .catch(function(error)
        {
            console.log(error);
            window.alert("Something went wrong finding the book");
        });
  };


  const saveEdits = function( event, original_isbn ) {
    event.preventDefault();

    if ( window.confirm("Update book information to:\nTitle: " + book.title
      + "\nISBN: " + book.isbn + "\nAuthor: " + book.author) ) {
      // console.log("save book, original isbn:" + original_isbn);

      Book.update(
        { isbn: book.isbn,
          title: book.title,
          author: book.uthor}, {
        where: {
          isbn: original_isbn
          }
        }).then( () => { Book.sync() } );
  }
    else {
      console.log("cancelled book update");
    }
  };

  const handleChange = bookEdit => {
    setBook({
      ...book,
      [bookEdit.target.name]: bookEdit.target.value
    });
  };

  return (
    <div className='centered'>
    <h1>Input edits and "Save"</h1>
    <form onSubmit={( event ) => saveEdits(event, original_isbn)}>
    <label className="metadata-edit-label">
      Title: &emsp;
      <input className="userInput" name="title" id="smaller-input" type="text"
           value={book.title} onChange={handleChange}/>
    </label>
    <br/>
    <label className="metadata-edit-label">
      ISBN: &emsp;
      <input className="userInput" name="isbn" id="smaller-input" type="ISBN"
          value={book.isbn} onChange={handleChange}/>
    </label>
    <br/>
    <label className="metadata-edit-label">
      Author: &emsp;
      <input className="userInput" name="author" id="smaller-input" type="text"
          value={book.author} onChange={handleChange}/>
    </label>
    <br/>
      <button className="edit-button" id="submit-btn" type="submit">Save</button>
    </form>
    <Link to={'/Home'} id='return-to-home'>
        <button className="edit-button" id="abortButton" title="Deletes any unsaved changes">Return to Home</button>
    </Link>
    </div>
  )
}

export default MetadataEdit;
