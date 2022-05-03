import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { RoomSelector, BookshelfSelector } from "../library_components";
import library_db from "../db_connect/sequelize_index"

const Book = library_db.book;
const Bookshelf = library_db.bookshelf;
const Room = library_db.room;

function AddBookManually() {
  const [firstLoad, setFirstLoad] = useState( true );
  const [bookInfo, setBookInfo] = useState({ author: "", title: "", isbn: "" });
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState( null );
  const [bookshelves, setBookshelves] = useState([]);
  const [selectedBookshelf, setSelectedBookshelf] = useState( null );

  function fetchBookshelves( room_id )
  {
    console.log("Fetching bookshelves..." + room_id )
    Bookshelf.findAll({
      where: {
      room_id: room_id
      },
      raw: true}).then((bookshelves_result) => {
        console.log("bookshelves: " + bookshelves_result)
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
    console.log("Working on first load…")
    setFirstLoad( false )
    Room.findAll({raw: true}).then((rooms) => {
      console.log("number of rooms: " + rooms.length)
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

  const handleSubmit = e => {
    e.preventDefault();
    //log bookInfo.author, bookInfo.book, bookInfo.isbn to the database instead of console
    //display success or failure message
    console.log(bookInfo);
    if( bookInfo.isbn.length == 0 ||  bookInfo.title.length == 0  || bookInfo.author.length == 0 )
    {
      window.alert("The book definition must include an ISBN, author, and title.\nPlease include all these items; otherwise it cannot be added to the library.");
    }
    else if (window.confirm("Add " + bookInfo.title + ", " + bookInfo.isbn + " by " + bookInfo.author + "?") ){
      Book.create( {
        isbn: bookInfo.isbn,
        title: bookInfo.title,
        author: bookInfo.author,
        bookshelf_id: selectedBookshelf
      }).then(() => {
        Book.sync().then((response) => {
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

  const handleRoomChange = e =>{
    setSelectedRoom( e.target.value );
    console.log(e.target.value )
    fetchBookshelves( e.target.value )
  };

  const handleBookshelfChange = e =>{
    setSelectedBookshelf(e.target.value);
    console.log(e.target.value)
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
      <div>Location:</div>
      <RoomSelector rooms={rooms} roomChange={handleRoomChange}/>
      <BookshelfSelector bookshelves={bookshelves} bookshelfChange={handleBookshelfChange}/>

      <Link to={'/AddBookAPI'}>
                  <button className="edit-button" id="abortButton">Back to add by search</button>
                  </Link>
    </div>
  );
}

export default AddBookManually;
