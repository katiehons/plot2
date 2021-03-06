import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { RoomSelector, BookshelfSelector } from "../library_components";
import library_db from "../db_connect/sequelize_index"

const Book = library_db.book;
const Bookshelf = library_db.bookshelf;
const Room = library_db.room;
//TODO test, handle multiple authors

function AddBookAPI() {
  const [firstLoad, setFirstLoad] = useState( true );
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState( null );
  const [bookshelves, setBookshelves] = useState([]);
  const [selectedBookshelf, setSelectedBookshelf] = useState( null );
  const [isbn, setISBN] = useState();

  /// same as edit_location, should probably refactor
  function fetchBookshelves( room_id )
  {
    Bookshelf.findAll({
      where: {
      room_id: room_id
      },
      raw: true}).then((bookshelves_result) => {
        setBookshelves( bookshelves_result );
        if( bookshelves_result.length > 0 )
        {
          setSelectedBookshelf( bookshelves_result.[0].bookshelf_id );
        }
        else
        {
          setSelectedBookshelf(null);
        }
    });
  }

  if( firstLoad )
  {
    setFirstLoad( false )
    Room.findAll({raw: true}).then((rooms) => {
          setRooms(rooms);
          if( rooms.length > 0 )
          {
            setSelectedRoom( rooms[0].room_id );
            fetchBookshelves( rooms[0].room_id );
          }
          else
          {
            setSelectedRoom(null)
            setBookshelves([])
            setSelectedBookshelf(null)
          }
        });
  }

///// ^^^ end of same as edit_location


  // todo: check if the book is already in the db/display sql error
    // Fetch the book info and submit it to the db
    const handleSubmit = e => {
        e.preventDefault();
        //display success or failure message
        fetch('https://www.googleapis.com/books/v1/volumes?q=isbn:'+isbn+'&key=AIzaSyCD09mSVM0FXfqGBT3tS0M-jRlu72FP-WI')
        .then(response => response.json())
        .then(function(data)
        {
            var title = data.items[0].volumeInfo.title;
            var authors = data.items[0].volumeInfo.authors;
            var isbn_13 = data.items[0].volumeInfo.industryIdentifiers[0].identifier;
            var cover = data.items[0].volumeInfo.imageLinks.thumbnail;

            var room_name = document.getElementById("room-sel-"+selectedRoom).text
            var bookshelf_name = document.getElementById("bookshelf-sel-"+selectedBookshelf).text

            if (window.confirm("Add " + title + " by " + authors + "\nLocation: " + room_name +", " + bookshelf_name ))
            {
                Book.create( {
                  isbn: isbn_13,
                  title: title,
                  author: authors.toString(),
                  cover: cover,
                  bookshelf_id: selectedBookshelf
                }).then(() => {
                  Book.sync().then((response) => {
                    setISBN("");
                    document.getElementById("isbn-input").value = "";
                  });
                })
                .catch((err) =>
                {
                  console.log(err);
                });
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

  const handleRoomChange = e =>{
    setSelectedRoom( e.target.value );
    fetchBookshelves( e.target.value )
  };

  const handleBookshelfChange = e =>{
    setSelectedBookshelf(e.target.value);
  };

  return (
    <div className='centered'>
    <h1>Add a New Book</h1>
      <form onSubmit={handleSubmit}>
        <input className="user-input" id="isbn-input" type="text"
              placeholder="Enter ISBN" onChange={handleChange}/>
        <br/>
        <RoomSelector rooms={rooms} roomChange={handleRoomChange}/>
        <br/>
        <BookshelfSelector bookshelves={bookshelves} bookshelfChange={handleBookshelfChange}/>
        <br/>
        <input type="submit" value="Search" />
      </form>
      <Link to={'/AddBookManually'}>
        <button id="submit-btn">Add manually</button>
      </Link>
    </div>
  )
}

export default AddBookAPI
