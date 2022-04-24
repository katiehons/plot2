import React, { location, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { RoomSelector, BookshelfSelector } from "../library_components";
import library_db from "../db_connect/sequelize_index"

const Book = library_db.book;
const Bookshelf = library_db.bookshelf;
const Room = library_db.room;

const queryString = require('query-string');

function MetadataEdit(props) {
  const [book, setBook] = useState("");
  const [selectedRoom, setSelectedRoom] = useState( null );
  const [rooms, setRooms] = useState([]);
  const [bookshelves, setBookshelves] = useState([]);
  // const [selectedBookshelf, setSelectedBookshelf] = useState( null );
  let history = useNavigate();
  const useQuery = () => new URLSearchParams(useLocation().search);
  let query = useQuery();

  // console.log("rendering metadata page");

  var original_isbn = query.get("isbn")

  if( book == "" ){
    // console.log("had no book, getting new book");
    Room.findAll({raw: true}).then((rooms) => {
      console.log("number of rooms: " + rooms.length)
          setRooms(rooms);
          if( rooms.length > 0 )
          {
            // setSelectedRoom( rooms[0].room_id );
            fetchBookshelves( rooms[0].room_id );
          }
          else
          {
            // setSelectedRoom(null)
            setBookshelves([])
            // setBook({ ...book, "bookshelf_id": bookshelves_result.[0].bookshelf_id });
            //
            // setSelectedBookshelf(null)
          }
        });
    Book.findAll({
      where: {
        isbn: original_isbn },
      raw: true,
      include: {
        model: Bookshelf,
        attributes: ["bookshelf_name"],
        include: {
          model:Room,
          attributes: ["room_name"]
        }}}).then((book) => {
      console.log("book: ")
      console.log( book[0] )
      setBook(book[0])

      let select_me = document.getElementById("room-sel-"+book[0]["bookshelf.room.room_id"]);
      console.log(select_me);
      if( select_me )
      {
        console.log("the item exists");
        console.log(select_me.selected);
        select_me.selected = true;
      }
      
    })
    .catch(function(error)
        {
            console.log(error);
            window.alert("Something went wrong finding the book");
        });
  };

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
          setBook({ ...book, "bookshelf_id": bookshelves_result.[0].bookshelf_id });
          // setSelectedBookshelf( bookshelves_result.[0].bookshelf_id );
        }
        else
        {
          setBook({ ...book, "bookshelf_id": null });
          // setSelectedBookshelf(null);
        }
    });
  }

  const saveEdits = function( event, original_isbn ) {
    event.preventDefault();

    if ( window.confirm("Update book information to:\nTitle: " + book.title
      + "\nISBN: " + book.isbn + "\nAuthor: " + book.author) ) {

      Book.update(
        { isbn: book.isbn,
          title: book.title,
          author: book.author,
          bookshelf_id: book.bookshelf_id
        },
        {
          where: {
            isbn: original_isbn
            }
        }).then( Book.sync() );
  }
    else {
      console.log("cancelled book update");
    }
  };

  const handleChange = bookEdit => {
    setBook({
      ...book,
      [bookEdit.target.name]: bookEdit.target.value
    });
  };

  const handleRoomChange = e => {
    setSelectedRoom( e.target.value );
    console.log(e.target.value )
    fetchBookshelves( e.target.value )
  };

  const handleBookshelfChange = bookEdit => {
    setBook({ ...book, "bookshelf_id": bookEdit.target.value });
  };

  return (
    <div className='centered'>
    <h1>Input edits and "Save"</h1>
    <form onSubmit={( event ) => saveEdits(event, original_isbn)}>
    <label className="metadata-edit-label">
      Title: &emsp;
      <input className="userInput" name="title" id="smaller-input" type="text"
           value={book.title} onChange={handleChange}/>
    </label>
    <br/>
    <label className="metadata-edit-label">
      ISBN: &emsp;
      <input className="userInput" name="isbn" id="smaller-input" type="ISBN"
          value={book.isbn} onChange={handleChange}/>
    </label>
    <br/>
    <label className="metadata-edit-label">
      Author: &emsp;
      <input className="userInput" name="author" id="smaller-input" type="text"
          value={book.author} onChange={handleChange}/>
    </label>
    <RoomSelector id="room-sel" rooms={rooms} roomChange={handleRoomChange}/>
    <BookshelfSelector bookshelves={bookshelves} bookshelfChange={handleBookshelfChange}/>
    <br/>
      <button className="edit-button" id="submit-btn" type="submit">Save</button>
    </form>
    <Link to={'/Home'} id='return-to-home'>
        <button className="edit-button" id="abortButton" title="Deletes any unsaved changes">Return to Home</button>
    </Link>
    </div>
  )
}

export default MetadataEdit;
