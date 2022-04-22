import { React, useState } from 'react';
import { Link } from 'react-router-dom'

import library_db from "../db_connect/sequelize_index"

const Book = library_db.book;
const Bookshelf = library_db.bookshelf;
const Room = library_db.room;

function AddBookManually() {
  const [bookInfo, setBookInfo] = useState({ author: "", book: "", isbn: "" });

  const handleSubmit = e => {
    e.preventDefault();
    //log bookInfo.author, bookInfo.book, bookInfo.isbn to the database instead of console
    //display success or failure message
    console.log(bookInfo);
    if( bookInfo.isbn.length == 0 )
    {
      window.alert("Please enter an ISBN");
    }
    else if( isNaN(bookInfo.isbn) )
    {
      window.alert("ISBN must be a number");
    }
    else if (window.confirm("Add " + bookInfo.title + ", " + bookInfo.isbn + " by " + bookInfo.author + "?") ){
      Book.create( {
        isbn: bookInfo.isbn,
        title: bookInfo.title,
        author: bookInfo.author,
      }).then(() => {
        Book.sync().then((response) => {
          // sequelize.close();
          document.getElementById('manual-add-form').reset();
        });
      });
    }
  };
  const handleChange = e => {
    setBookInfo({
      ...bookInfo,
      [e.target.name]: e.target.value
    });
  };
  return (
    <div className="centered">
      <h1>Add Book (By manual entry)</h1>
      <form id="manual-add-form" onSubmit={handleSubmit}>
        <input id="smaller-input" name="author" type="text"
              placeholder="Author" onChange={handleChange}/>
        <br/>
        <input id="smaller-input" name="title" type="text"
              placeholder="Book Title" onChange={handleChange}/>
        <br/>
        <input id="smaller-input" name="isbn" type="ISBN"
              placeholder="ISBN" onChange={handleChange}/>
        <br/>
        <input className="edit-button" id="submit-btn" type="submit" value="Add Book" />
      </form>

      <Link to={'/AddBookAPI'}>
                  <button className="edit-button" id="abortButton">Back to add by search</button>
                  </Link>
    </div>
  );
}

export default AddBookManually;
