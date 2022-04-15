import { React, useState } from 'react';
import { Sequelize } from 'sequelize';
import { Link } from 'react-router-dom'


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
          console.log('sequelize Connection has been established successfully.');
        } catch (error) {
          console.error('Unable to connect to the sequelize database:', error);
        }
      })();

      const Book = require( '../db_connect/models/book')(sequelize);

      Book.create( {
        isbn: bookInfo.isbn,
        title: bookInfo.title,
        author: bookInfo.author,
      }).then(() => {
        Book.sync().then((response) => {
          sequelize.close();
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
