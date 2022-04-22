import {  React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Op } from 'sequelize';
import imageNotFound from '../images/imageNotFound.svg';
import library_db from "../db_connect/sequelize_index"

const Book = library_db.book;

function Search() {
  const [searchTerm, setSearchTerm] = useState();
  const [filter, setFilter] = useState( "author" );
  const [books, setBooks] = useState([]);

////////////////////
// copied from home.js
// generate the book list
  let history = useNavigate();

  const editBook = ( isbn ) => {
    console.log("sending " + "/MetadataEdit?isbn=" + isbn )
    history("/MetadataEdit?isbn=" + isbn);
  }

  function makeBook(book)
  {
    console.log("creating " + book.title);

    //get the image for each cover and set custom image if none found
    // var cover;
    // if(book.cover != null){
    //   cover = book.cover;
    // }else{
    //   cover = imageNotFound;
    // }

    var title = book.title;
    var isbn = book.isbn;
    var author = book.author;

    // was formerly immediately above id="title" div
    // <img id="cover-block" src={cover}/>

    return(
      <p class="list-block">
        <div id="metadata-block">
            <div class="metadata-item" id="title">
            Title: {title}
            </div>
            <div class="metadata-item" id="isbn">
            ISBN: {isbn}
            </div>
            <div class="metadata-item" id="author">
            Author: {author}
            </div>
        </div>
        <button type="button" className="edit-button" onClick={() => editBook(isbn)}>
          Edit
        </button>
      </p>
    )
  }

  function BookList({books}) {
    console.log("displaying books" + books);
    return (
      <div id='book-list'>{books.map((book) => makeBook(book))}</div>
    )
  }
// fin copied from home.js
///////////////

  const handleSubmit = e => {
    e.preventDefault();

    var block = document.getElementById('book-list');
    while (block.hasChildNodes()) {
      block.removeChild(block.lastChild);
    }

    Book.findAll({where: {
                    [filter]: { [Op.like]: `%${searchTerm}%` } },
                    raw: true})
      .then((books) => {
      console.log("we found:" + books);
      console.log( "num books:" + books.length)
      console.log( "books == 0: " + (books.length == 0));
      setBooks( books );
      document.getElementById("no-books-found").hidden = ( books.length != 0);
    });
  };
  const handleChange = e => {
    setSearchTerm(e.target.value);
  };

  const handleDropdown = e =>{
    setFilter(e.target.value);
  };

//todo flexibly generate filter types based on what columns in the db are
  return (
    <div className= 'search'>
      <h1 id="search-header">Search</h1>
      <Link to={'/Home'} id='homelink-searchpage'>
        <button id="homelinkbtn" className="otherpage-nav-button">Back to home</button>
      </Link>
      <form onSubmit={handleSubmit} className="centered">
        <select name="filter-value" id="filter-dropdown" onChange={handleDropdown}>
          <option value="author">Author</option>
          <option value="title">Title</option>
          <option value="isbn">ISBN</option>
        </select>

       <input className="userInput" id="search-input" name="isbn" type="text"
             placeholder="Search for…" onChange={handleChange}/>
       <input className="edit-button" id="search-btn" type="submit" value="Go" />
      </form>
      <div id="no-books-found" hidden><br/> No items in the library matched your search </div>
      <BookList books={books}/>
    </div>
  )
}

export default Search;
