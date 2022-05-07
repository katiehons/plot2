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
  const [bookshelves, setBookshelves] = useState([]);
  const [selectedBookshelf, setSelectedBookshelf] = useState( null );

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
            fetchBookshelves( rooms[0].room_id );
          }
          else
          {
            setBookshelves([])
            setSelectedBookshelf(null)
          }
        });
  }

  const handleSubmit = e => {
    e.preventDefault();
    //display success or failure message
    if( bookInfo.isbn.length === 0 ||  bookInfo.title.length === 0  || bookInfo.author.length === 0 )
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
    fetchBookshelves( e.target.value )
  };

  const handleBookshelfChange = e =>{
    setSelectedBookshelf(e.target.value);
  };

  return (
    <div className="centered">
      <h1>Add a New Book</h1>
      <form id="manual-add-form" onSubmit={handleSubmit}>
        <input className="user-input" name="author" type="text"
              placeholder="Author" onChange={handleChange}/>
        <br/>
        <input className="user-input" name="title" type="text"
              placeholder="Book Title" onChange={handleChange}/>
        <br/>
        <input className="user-input" name="isbn" type="ISBN"
              placeholder="ISBN" onChange={handleChange}/>
        <br/>
        <RoomSelector rooms={rooms} roomChange={handleRoomChange}/>
        <br/>
        <BookshelfSelector bookshelves={bookshelves} bookshelfChange={handleBookshelfChange}/>
        <br/>
        <input id="submit-btn" type="submit" value="Add Book" />
      </form>

      <Link to={'/AddBookAPI'}>
                  <button id="abortButton">Add by Searching</button>
                  </Link>
    </div>
  );
}

export default AddBookManually;
