import React, { location, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import sendAsync from '../db_connect/renderer';
import { Sequelize } from 'sequelize';
const queryString = require('query-string');


function MetadataEdit(props) {
  const [book, setBook] = useState([]);
  let history = useNavigate();
  const useQuery = () => new URLSearchParams(useLocation().search);
  let query = useQuery();

  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './data/library.db',
    define: {
      timestamps: false
    }
  });

  (async function(){
    try {
      await sequelize.authenticate();
      console.log('Metadata: sequelize Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the sequelize database:', error);
    }
  })();

  const Book = require('../db_connect/models/book')(sequelize);

  console.log("rendering metadata page");

  var original_isbn = query.get("isbn")

  if( book.length == 0 ){
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

    // var sqlGetBook = "SELECT * FROM books WHERE isbn = ?;";
    // var params = [original_isbn]
    // sendAsync(sqlGetBook, params).then((result) => {
    //   console.log("result from the db: " + result);
    //   setBook(result[0]);
    // })
    // .catch(function(error)
    // {
    //     console.log(error);
    //     window.alert("Something went wrong updating the book");
    // })
  };

  const saveEdits = function( event, original_isbn ) {
    if ( window.confirm("Update book information to:\nTitle: " + book.title
      + "\nISBN: " + book.isbn + "\nAuthor: " + book.author) ) {
      console.log("save book, original isbn:" + original_isbn);
      // await Book.update(
      //   { isbn: book.isbn,
      //     title: book.title,
      //     author: book.uthor}, {
      //   where: {
      //     isbn: original_isbn
      //     }
      //   });


      // .then( () => { Book.sync() } );
    var sqlUpdateBook = "UPDATE books SET isbn = ?, title = ?, author = ? WHERE isbn = ?;";
    var params = [book.isbn, book.title, book.author, original_isbn];
    console.log("update sql string: \n" + sqlUpdateBook)
    sendAsync(sqlUpdateBook, params).then((result) => {
      console.log("update sql result:\n" + result);
    });
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
