import React, { location, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import sendAsync from '../db_connect/renderer';
const queryString = require('query-string');


function MetadataEdit(props) {
  // const [book, setBook] = useState([]);
  // let history = useHistory();
  //
  // console.log("rendering metadata page");
  // var original_isbn = queryString.parse(props.location.search).isbn
  //
  // if( book.length == 0 ){
  //   var sqlGetBook = "SELECT * FROM books WHERE isbn = ?;";
  //   var params = [original_isbn]
  //   sendAsync(sqlGetBook, params).then((result) => {
  //     console.log("result from the db: " + result);
  //     setBook(result[0]);
  //   })
  //   .catch(function(error)
  //   {
  //       console.log(error);
  //       window.alert("Something went wrong updating the book");
  //   })};
  //
  // const saveEdits = function( event, original_isbn ) {
  //   if ( window.confirm("Update book information to:\nTitle: " + book.title
  //     + "\nISBN: " + book.isbn + "\nAuthor: " + book.author) ) {
  //   console.log("save book, original isbn:" + original_isbn);
  //   var sqlUpdateBook = "UPDATE books SET isbn = ?, title = ?, author = ? WHERE isbn = ?;";
  //   var params = [book.isbn, book.title, book.author, original_isbn];
  //   console.log("update sql string: \n" + sqlUpdateBook)
  //   sendAsync(sqlUpdateBook, params).then((result) => {
  //     console.log("update sql result:\n" + result);
  //   });
  // }
  //   else {
  //     console.log("cancelled book update");
  //   }
  // };
  //
  // const handleChange = bookEdit => {
  //   setBook({
  //     ...book,
  //     [bookEdit.target.name]: bookEdit.target.value
  //   });
  // };
  //
  // return (
  //   <div className='centered'>
  //   <h1>Input edits and "Save"</h1>
  //   <form onSubmit={( event ) => saveEdits(event, original_isbn)}>
  //   <label className="metadata-edit-label">
  //     Title: &emsp;
  //     <input className="userInput" name="title" id="smaller-input" type="text"
  //          value={book.title} onChange={handleChange}/>
  //   </label>
  //   <br/>
  //   <label className="metadata-edit-label">
  //     ISBN: &emsp;
  //     <input className="userInput" name="isbn" id="smaller-input" type="ISBN"
  //         value={book.isbn} onChange={handleChange}/>
  //   </label>
  //   <br/>
  //   <label className="metadata-edit-label">
  //     Author: &emsp;
  //     <input className="userInput" name="author" id="smaller-input" type="text"
  //         value={book.author} onChange={handleChange}/>
  //   </label>
  //   <br/>
  //     <button className="edit-button" id="submit-btn" type="submit">Save</button>
  //   </form>
  //   <Link to={'/Home'} id='return-to-home'>
  //       <button className="edit-button" id="abortButton" title="Deletes any unsaved changes">Return to Home</button>
  //   </Link>
  //   </div>
  // )
  return(
    <h1>metadata edit</h1>
  )
}

export default MetadataEdit;
