import React from 'react';
import { Link } from 'react-router-dom';
import { Sequelize, Op } from 'sequelize';
// import sendAsync from '../db_connect/renderer';
import imageNotFound from '../images/imageNotFound.svg';

function Search() {
  const [searchTerm, setSearchTerm] = React.useState();
  const [filter, setFilter] = React.useState( "author" );

  const handleSubmit = e => {
    e.preventDefault();

    var block = document.getElementById('book-list');
    while (block.hasChildNodes()) {
      block.removeChild(block.lastChild);
    }

    // var sqlGetBooks = "SELECT * FROM books WHERE " + filterValue.type + " LIKE ?;";
    // var params =["%" + state.isbn + "%"];
    // console.log("searching: " + sqlGetBooks);

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

    const Book = require('../db_connect/models/book')(sequelize)

    // sendAsync(sqlGetBooks, params).then((result) => {
    Book.findAll({where: {
                    [filter]: { [Op.like]: `%${searchTerm}%` } },
                    raw: true})
      .then((books) => {
      console.log("we found:" + books);
      // var block = document.getElementById('book-list');

      // while (block.hasChildNodes()) {
      //   block.removeChild(block.lastChild);
      // }
      var i;
      if(books.length == 0){
        var newBlock = document.createElement('p');
        newBlock.innerHTML = "No items in your library matched your search.";
        document.getElementById('book-list').appendChild(newBlock);
      }
      for(i = 0; i < books.length; i++){
        var newBlock = document.createElement('p');
        newBlock.className = "list-block";

        //create the img and metadata blocks each book
        var coverBlock = document.createElement('img');
        var metadataBlock = document.createElement('div');

        //create each element to insert into the metadata
        var titleBlock = document.createElement('div');
        var authorBlock = document.createElement('div');
        var isbnBlock = document.createElement('div');

        //gives ids and className to each element for easy CSS access
        metadataBlock.id = "metadata-block";
        coverBlock.id = "cover-block";
        titleBlock.className = "metadata-item";
        authorBlock.className = "metadata-item";
        isbnBlock.className = "metadata-item";

        //sets the image for each cover and sets custom image if none found
        if(books[i].cover != null){
          coverBlock.src = books[i].cover;
        }else{
          coverBlock.src = imageNotFound;
        }

        //sets the values for the metadata entered
        titleBlock.innerHTML = "Title: " + books[i].title;
        authorBlock.innerHTML = "Author: " + books[i].author;
        isbnBlock.innerHTML = "ISBN: " + books[i].isbn;

        //appends the metadata elements to the metadata block
        metadataBlock.appendChild(authorBlock);
        metadataBlock.appendChild(isbnBlock);
        metadataBlock.appendChild(titleBlock);

        //appends the image and metadata blocks to the list block
        newBlock.appendChild(coverBlock);
        newBlock.appendChild(metadataBlock);

        //finally appends the created list block to the list of books
        document.getElementById('book-list').appendChild(newBlock);
      }
    });
  };
  const handleChange = e => {
    setSearchTerm(e.target.value);
  };

  const handleDropdown = e =>{
    setFilter(e.target.value);
  };

  return (
    <>
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
             placeholder="Enter text" onChange={handleChange}/>
       <input className="edit-button" id="search-btn" type="submit" value="Search" />
      </form>
      <div id="book-list"></div>
    </div>
    </>
  )
}

export default Search;
