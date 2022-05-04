import {  React, useState } from 'react';
import { Op } from 'sequelize';
import { BookList } from "../library_components";
import library_db from "../db_connect/sequelize_index"

const Book = library_db.book;
const Bookshelf = library_db.bookshelf;
const Room = library_db.room;

function Search() {
  const [searchTerm, setSearchTerm] = useState();
  const [filter, setFilter] = useState( "author" );
  const [books, setBooks] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();

    // var block = document.getElementById('book-list');
    // while (block.hasChildNodes()) {
    //   block.removeChild(block.lastChild);
    // }

    Book.findAll({where: {
                    [filter]: { [Op.like]: `%${searchTerm}%` } },
                    raw: true,
                    include: {
                      model: Bookshelf,
                      attributes: ["bookshelf_name"],
                      include: {
                        model:Room,
                        attributes: ["room_name"]
                      }}})
      .then((books) => {
      console.log("we found:" + books);
      console.log( "num books:" + books.length)
      console.log( "books == 0: " + (books.length === 0));
      setBooks( books );
      document.getElementById("no-books-found").hidden = ( books.length !== 0);
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
      <form onSubmit={handleSubmit} className="centered">
        <select name="filter-value" id="filter-dropdown" onChange={handleDropdown}>
          <option value="author">Author</option>
          <option value="title">Title</option>
          <option value="isbn">ISBN</option>
        </select>

       <input className="userInput" id="search-input" name="isbn" type="text"
             placeholder="Search for…" onChange={handleChange}/>
       <input id="search-btn" type="submit" value="Go" />
      </form>
      <div id="no-books-found" hidden><br/> No items in the library matched your search </div>
      <BookList books={books}/>
    </div>
  )
}

export default Search;
