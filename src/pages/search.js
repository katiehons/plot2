import React from 'react';
// import sendAsync from '../db_connect/renderer';
// import imageNotFound from '../Pages/imageNotFound.svg';

function Search() {
  // const [state, setState] = React.useState({ isbn: "" });
  // const [filterValue, setFilter] = React.useState({ value: "" });
  //
  // const handleSubmit = e => {
  //   e.preventDefault();
  //   if(filterValue.type == null){
  //     filterValue.type = "author";
  //   }
  //   var sqlGetBooks = "SELECT * FROM books WHERE " + filterValue.type + " LIKE ?;";
  //   var params =["%" + state.isbn + "%"];
  //   console.log("searching: " + sqlGetBooks);
  //   sendAsync(sqlGetBooks, params).then((result) => {
  //     console.log("we found:" + result);
  //     var block = document.getElementById('book-list');
  //
  //     while (block.hasChildNodes()) {
  //       block.removeChild(block.lastChild);
  //     }
  //     var i;
  //     if(result.length == 0){
  //       var newBlock = document.createElement('p');
  //       newBlock.innerHTML = "No items in your library matched your search.";
  //       document.getElementById('book-list').appendChild(newBlock);
  //     }
  //     for(i = 0; i < result.length; i++){
  //       var newBlock = document.createElement('p');
  //       newBlock.className = "list-block";
  //
  //       //create the img and metadata blocks each book
  //       var coverBlock = document.createElement('img');
  //       var metadataBlock = document.createElement('div');
  //
  //       //create each element to insert into the metadata
  //       var titleBlock = document.createElement('div');
  //       var authorBlock = document.createElement('div');
  //       var isbnBlock = document.createElement('div');
  //
  //       //gives ids and className to each element for easy CSS access
  //       metadataBlock.id = "metadata-block";
  //       coverBlock.id = "cover-block";
  //       titleBlock.className = "metadata-item";
  //       authorBlock.className = "metadata-item";
  //       isbnBlock.className = "metadata-item";
  //
  //       //sets the image for each cover and sets custom image if none found
  //       if(result[i].cover != null){
  //         coverBlock.src = result[i].cover;
  //       }else{
  //         coverBlock.src = imageNotFound;
  //       }
  //
  //       //sets the values for the metadata entered
  //       titleBlock.innerHTML = "Title: " + result[i].title;
  //       authorBlock.innerHTML = "Author: " + result[i].author;
  //       isbnBlock.innerHTML = "ISBN: " + result[i].isbn;
  //
  //       //appends the metadata elements to the metadata block
  //       metadataBlock.appendChild(authorBlock);
  //       metadataBlock.appendChild(isbnBlock);
  //       metadataBlock.appendChild(titleBlock);
  //
  //       //appends the image and metadata blocks to the list block
  //       newBlock.appendChild(coverBlock);
  //       newBlock.appendChild(metadataBlock);
  //
  //       //finally appends the created list block to the list of books
  //       document.getElementById('book-list').appendChild(newBlock);
  //     }
  //   });
  // };
  // const handleChange = e => {
  //   setState({
  //     ...state,
  //     [e.target.name]: e.target.value
  //   });
  // };
  // const handleDropdown = e =>{
  //   setFilter({
  //     ...filterValue,
  //     ["type"]: e.target.value
  //   });
  // };
  // return (
  //   <div className= 'search'>
  //     <h1 id="search-header">Search</h1>
  //     <form onSubmit={handleSubmit} className="centered">
  //       <select name="filter-value" id="filter-dropdown" onChange={handleDropdown}>
  //         <option value="author">Author</option>
  //         <option value="title">Title</option>
  //         <option value="isbn">ISBN</option>
  //       </select>
  //
  //      <input className="userInput" id="search-input" name="isbn" type="text"
  //            placeholder="Enter text" onChange={handleChange}/>
  //      <input className="edit-button" id="search-btn" type="submit" value="Search" />
  //     </form>
  //     <div id="book-list"></div>
  //   </div>
  // )
  // // populate with books from database
  return(
    <h1>search</h1>
  )
}

export default Search;
