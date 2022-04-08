import React from 'react';
import sendAsync from '../db_connect/renderer';
import { Link } from 'react-router-dom'


function AddBookManually() {
  const [state, setState] = React.useState({ author: "", book: "", isbn: "" });
  const handleSubmit = e => {
    e.preventDefault();
    //log state.author, state.book, state.isbn to the database instead of console
    //display success or failure message
    console.log(state);
    if( state.isbn.length == 0 )
    {
      window.alert("Please enter an ISBN");
    }
    else if( isNaN(state.isbn) )
    {
      window.alert("ISBN must be a number");
    }
    else if (window.confirm("Add " + state.title + ", " + state.isbn + " by " + state.author + "?") ){
      var sqlInsert = "INSERT INTO books(isbn, title, author)\nVALUES(?, ?, ?);";
      var params = [state.isbn, state.title, state.author];
      console.log("sql string: \n" + sqlInsert)
      sendAsync(sqlInsert, params).then((result) => console.log(result));
    }
  };
  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };
  return (
    <div className="centered">
      <h1>Add Book (By manual entry)</h1>
      <form onSubmit={handleSubmit}>
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
