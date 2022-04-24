import React, { location, useState, useReducer } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { RoomSelector, BookshelfSelector } from "../library_components";
import library_db from "../db_connect/sequelize_index"

const Book = library_db.book;
const Bookshelf = library_db.bookshelf;
const Room = library_db.room;

const queryString = require('query-string');

function MetadataEdit(props) {
  const bookInitialState = { isbn: "", title: "", author: "", bookshelf_id: "" }
  const [book, updateBook] = useReducer(
    (book, bookUpdates) => ({
      ...book,
      ...bookUpdates,
    }),
    bookInitialState);

  const [firstLoad, setFirstLoad] = useState( true );
  const [selectedRoom, setSelectedRoom] = useState( null );
  const [rooms, setRooms] = useState([]);
  const [bookshelves, setBookshelves] = useState([]);
  let history = useNavigate();
  const useQuery = () => new URLSearchParams(useLocation().search);
  let query = useQuery();

  var original_isbn = query.get("isbn")

  if( firstLoad ){
    setFirstLoad(false)
    Room.findAll({raw: true}).then((rooms) => {
      console.log("number of rooms: " + rooms.length)
          setRooms(rooms);
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
        }}}).then((bookList) => {
      let foundBook = bookList[0]
      console.log( book[0] )
      updateBook( {isbn: foundBook.isbn, title: foundBook.title, author: foundBook.author, bookshelf_id: foundBook.bookshelf_id })

      let book_room_opt = document.getElementById("room-sel-"+foundBook["bookshelf.room.room_id"]);
      if( book_room_opt )
      {
        book_room_opt.selected = true;
        setSelectedRoom( book_room_opt.value );
        fetchBookshelves( book_room_opt.value, false ).then( () => {
          let book_shelf_opt = document.getElementById("bookshelf-sel-"+foundBook.bookshelf_id);
          if( book_shelf_opt )
          {
            book_shelf_opt.selected = true;
            updateBook({ bookshelf_id: book_shelf_opt.value });
          }
        })
      }
    })
    .catch(function(error)
        {
            console.log(error);
            window.alert("Something went wrong finding the book");
            history(-1);
            //todo, history.push another page so it doesn't stall
        });
  };

  async function fetchBookshelves( room_id, shouldSetBooksBookshelf=true )
  {
    console.log("Fetching bookshelves..." + room_id )
    return Bookshelf.findAll({
      where: {
      room_id: room_id
      },
      raw: true}).then((bookshelves_result) => {
        setBookshelves( bookshelves_result );
        if( bookshelves_result.length > 0 && shouldSetBooksBookshelf )
        {
          updateBook({ bookshelf_id: bookshelves_result.[0].bookshelf_id });
        }
        else
        {
          updateBook({ bookshelf_id: null });
        }
    });
  }

  const saveEdits = function( event, original_isbn ) {
    event.preventDefault();
    var bookshelf_name = document.getElementById("bookshelf-sel-"+book.bookshelf_id).text

    if ( window.confirm("Update book information to:\nTitle: " + book.title
      + "\nISBN: " + book.isbn + "\nAuthor: " + book.author + "\nBookshelf: " + bookshelf_name) ) {

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

  const deleteBook = function( delete_isbn ) {
    Book.destroy({ where:{ isbn: delete_isbn } })
    .then( ()=> {
      Book.sync()
      history(-1);
    })
  }

  const handleChange = bookEdit => {
    updateBook({[bookEdit.target.name]: bookEdit.target.value})
  };

  const handleRoomChange = e => {
    setSelectedRoom( e.target.value );
    fetchBookshelves( e.target.value )
  };

  const handleBookshelfChange = bookEdit => {
    updateBook({ bookshelf_id: bookEdit.target.value });
  };

  const handleDeleteBook = e =>{
    if( window.confirm( "Do you want to delete this book?\nThis action cannot be undone."))
    {
      console.log("deleting book: " + book.isbn )
      deleteBook( book.isbn );
    }
  }

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
    <button className="edit-button" id="delete-btn" onClick={handleDeleteBook}>Delete this book</button>
    <Link to={'/Home'} id='return-to-home'>
        <button className="edit-button" id="abortButton" title="Deletes any unsaved changes">Return to Home</button>
    </Link>
    </div>
  )
}

export default MetadataEdit;
