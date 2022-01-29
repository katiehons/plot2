import React, { useState } from 'react';
import sendAsync from '../db_connect/renderer';
import { Link } from 'react-router-dom'

//TODO test, handle multiple authors

function AddBookAPI() {
  const [message, setMessage] = useState('SELECT * FROM books');
  const [response, setResponse] = useState();

  function send(sql) {
    sendAsync(sql).then((result) => setResponse(result));
  }

  const [state, setState] = React.useState({ isbn: "" });

    // Fetch the book info and submit it to the db
    const handleSubmit = e => {
        e.preventDefault();
        //log state.isbn to the database instead of console
        //display success or failure message
        console.log("sending: " + state.isbn)
        fetch('https://www.googleapis.com/books/v1/volumes?q=isbn:'+state.isbn+'&key=AIzaSyCD09mSVM0FXfqGBT3tS0M-jRlu72FP-WI')
        .then(response => response.json())
        .then(function(data)
        {
            var title = data.items[0].volumeInfo.title;
            var authors = data.items[0].volumeInfo.authors;
            var isbn_13 = data.items[0].volumeInfo.industryIdentifiers[0].identifier;
            var cover = data.items[0].volumeInfo.imageLinks.thumbnail;

            if (window.confirm("Add " + title + " by " + authors)) {
                console.log('Adding' + title + ", " + authors + ", isbn-13: " + isbn_13);

                var sqlInsert = "INSERT INTO books(isbn, title, author, cover)\nVALUES(?, ?, ?, ?);";
                var params = [isbn_13, title, authors, cover];
                console.log("sql string: \n" + sqlInsert)
                sendAsync(sqlInsert, params).then((result) => console.log(result));
            }
            else {
                console.log('cancel');
            }
            return;
        })
        .catch(function(error)
        {
            console.log(error);
            window.alert("Failed to find a book with ISBN " + state.isbn + "; \n You can try again or add the information manually.")
        } );
    };

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className='centered'>
    <h1>Add Book (by search) </h1>
      <form onSubmit={handleSubmit}>
        <input className="userInput" id="smaller-input" name="isbn" type="text"
              placeholder="Enter ISBN" onChange={handleChange}/>
        <input className="edit-button" id="search-btn" type="submit" value="Search the www" />
      </form>
      <Link to={'/AddBookManually'}>
        <button className="edit-button" id="submit-btn">Add manually</button>
      </Link>
      <Link to={'/Home'} id='homelink-api-addpage'>
        <button id="homelinkbtn-api-addpage" className="homepage-nav-button">Home</button>
      </Link>
    </div>
  )

  // return(
  //   <div>
  //   <h1> Add Book </h1>
  //
  //   <Link to={'/AddBookManually'}>
  //     <button className="edit-button" id="submit-btn">Add manually</button>
  //   </Link>
  //   </div>
  // )
}

export default AddBookAPI
