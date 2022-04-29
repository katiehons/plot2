import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { RoomSelector, BookshelfSelector, BookList } from "../library_components";
import library_db from "../db_connect/sequelize_index"

const Book = library_db.book;
const Bookshelf = library_db.bookshelf;
const Room = library_db.room;

function BrowseLocations()
{
  const [firstLoad, setFirstLoad] = useState( true );
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState( null );
  const [bookshelves, setBookshelves] = useState([]);
  const [selectedBookshelf, setSelectedBookshelf] = useState( null );
  const [books, setBooks] = useState([]);

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
          fetchBooks( bookshelves_result.[0].bookshelf_id )
        }
        else
        {
          setSelectedBookshelf(null);
        }
    });
  }

  function fetchBooks( bookshelf_id )
  {
    Book.findAll({where: {
                    bookshelf_id: bookshelf_id },
                    raw: true,
                    include: {
                      model: Bookshelf,
                      attributes: ["bookshelf_name"],
                      include: {
                        model:Room,
                        attributes: ["room_name"]
                      }}})
      .then((books) => {
      console.log("we found:" + books);
      console.log( "num books:" + books.length)
      console.log( "books == 0: " + (books.length == 0));
      setBooks( books );
      document.getElementById("no-books-found").hidden = ( books.length != 0);
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

  const handleRoomChange = e =>{
    setSelectedRoom( e.target.value );
    console.log(e.target.value )
    fetchBookshelves( e.target.value )
  };

  const handleBookshelfChange = e =>{
    setSelectedBookshelf(e.target.value);
    fetchBooks(e.target.value)
    console.log(e.target.value)
  };

  return (
    <div className= 'browse-locations'>
    <h1>Browse by Location</h1>
    <center><RoomSelector rooms={rooms} roomChange={handleRoomChange}/></center>
    <center><BookshelfSelector bookshelves={bookshelves} bookshelfChange={handleBookshelfChange}/></center>
    <BookList books={books}/>
    <div id="no-books-found" hidden><br/> There are no books at this location </div>

    </div>
  )
}

export default BrowseLocations;
