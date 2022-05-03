import { React, useState } from 'react';
import { Link } from 'react-router-dom'
import { Sequelize } from 'sequelize';

//TODO test, handle multiple authors

function AddBookAPI() {
  const [firstLoad, setFirstLoad] = useState( true );
  const [response, setResponse] = useState();
  // const [rooms, setRooms] = useState([]);
  // const [bookshelfRoom, setBookshelfRoom] = useState();
  const [isbn, setISBN] = useState();

//todo: Add location sel's
  // if( firstLoad )
  // {
  //   console.log("Working on first load…")
  //   setFirstLoad( false )
  //   var sql_get_rooms = "SELECT room_name FROM rooms";
  //   sendAsync(sql_get_rooms).then((result) => {
  //     console.log("got rooms from db");
  //     console.log(result);
  //     if( result.length > 0) {
  //       setRooms(result);
  //       setBookshelfRoom(result[0].room_name)
  //
  //       let roomList = rooms.length > 0 && rooms.map((item, i) => {
  //         return (
  //           <option key={i} value={item.room_name}>{item.room_name}</option>
  //         )
  //         }, this);
  //       // roomList.unshift( <option key={0} value={""}></option> );
  //       console.log("roomlist: " + roomList)
  //
  //     }
  //   });
  // }


  // todo: check if the book is already in the db/display sql error
    // Fetch the book info and submit it to the db
    const handleSubmit = e => {
        e.preventDefault();
        //log isbn to the database instead of console
        //display success or failure message
        console.log("sending: " + isbn)
        fetch('https://www.googleapis.com/books/v1/volumes?q=isbn:'+isbn+'&key=AIzaSyCD09mSVM0FXfqGBT3tS0M-jRlu72FP-WI')
        .then(response => response.json())
        .then(function(data)
        {
            var title = data.items[0].volumeInfo.title;
            var authors = data.items[0].volumeInfo.authors;
            var isbn_13 = data.items[0].volumeInfo.industryIdentifiers[0].identifier;
            var cover = data.items[0].volumeInfo.imageLinks.thumbnail;

            if (window.confirm("Add " + title + " by " + authors)) {
                console.log('Adding' + title + ", " + authors + ", isbn-13: " + isbn_13);

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

                console.log("author: " + authors);
                Book.create( {
                  isbn: isbn_13,
                  title: title,
                  author: authors.toString(),
                  cover: cover
                }).then(() => {
                  Book.sync().then((response) => {
                    sequelize.close();
                    setISBN("");
                    document.getElementById.value = isbn;

                  });
                });
            }
            else {
                console.log('add canceled');
            }
            return;
        })
        .catch(function(error)
        {
            console.log(error);
            window.alert("Failed to find a book with ISBN " + isbn + "; \n You can try again or add the information manually.")
        } );
    };

  const handleChange = e => {
    setISBN(e.target.value);
  };

  return (
    <div className='centered'>
    <h1>Add Book (by search) </h1>
      <form onSubmit={handleSubmit}>
        <input className="userInput" id="isbn-input" type="text"
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
}

export default AddBookAPI
