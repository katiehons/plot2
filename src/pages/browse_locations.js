import { React, useState } from 'react';
import { RoomSelector, BookshelfSelector, BookList } from "../library_components";
import library_db from "../db_connect/sequelize_index"

const Book = library_db.book;
const Bookshelf = library_db.bookshelf;
const Room = library_db.room;

function BrowseLocations()
{
  const [firstLoad, setFirstLoad] = useState( true );
  const [rooms, setRooms] = useState([]);
  const [bookshelves, setBookshelves] = useState([]);
  const [books, setBooks] = useState([]);

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
          fetchBooks( bookshelves_result.[0].bookshelf_id )
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
      setBooks( books );
      document.getElementById("no-books-found").hidden = ( books.length !== 0);
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
          }
        });
  }

  const handleRoomChange = e =>{
    fetchBookshelves( e.target.value )
  };

  const handleBookshelfChange = e =>{
    fetchBooks(e.target.value)
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
