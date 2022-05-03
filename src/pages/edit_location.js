import {React, useState} from 'react';
import { Link } from 'react-router-dom'
import { RoomSelector, BookshelfSelector } from "../library_components";
import library_db from "../db_connect/sequelize_index";

const Bookshelf = library_db.bookshelf;
const Room = library_db.room;

function EditLocation() {
  const[firstLoad, setFirstLoad] = useState( true );
  const[rooms, setRooms] = useState([]);
  const[selectedRoom, setSelectedRoom] = useState( null );
  const[bookshelves, setBookshelves] = useState([]);
  const[selectedBookshelf, setSelectedBookshelf] = useState( null );

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


/// from add book pg, needs rework!!! todotodotodo vvvvvvvvvvvvv
  // const [state, setState] = useState({ author: "", book: "", isbn: "" });
  const handleSubmit = e => {
  //   e.preventDefault();
  //   //display success or failure message
  //   console.log(state);
  };

///^^^^^^^^^^^^^^^^^^
  function deleteBookshelf( bookshelf_id, from_room_delete=false )
  {
    Bookshelf.destroy({
      where: {
        bookshelf_id: bookshelf_id
      }
    }).then( () => {
      Bookshelf.sync()
      console.log( "Current room: " + selectedRoom );
      if( !from_room_delete )
      {
        fetchBookshelves( selectedRoom );
      }
    });
  }

  const handleDeleteBookshelf = e =>{
    var bookshelf_sel = document.getElementById("bookshelfsel")
    var bookshelf_name = bookshelf_sel.options[bookshelf_sel.selectedIndex].text
    var bookshelf_id = bookshelf_sel.options[bookshelf_sel.selectedIndex].value

    if( window.confirm( "Are you sure you want to delete bookshelf \"" + bookshelf_name + "\"?\nThis will unset location for all books on this shelf."))
    {
      console.log("deleting bookshelf: " + bookshelf_name + " id: " + bookshelf_id )
      deleteBookshelf( bookshelf_id );
    }
  }

  const handleDeleteRoom = e =>{
    var room_sel = document.getElementById("roomsel")
    var room_name = room_sel.options[room_sel.selectedIndex].text
    var room_id = room_sel.options[room_sel.selectedIndex].value

    if( window.confirm( "Are you sure you want to delete room \"" + room_name + "\"?\nThis will also delete all bookshelves in this room."))
    {
      // this takes care of deleting bookshelfs and room-bookshelf associations
      for (var i = 0; i < bookshelves.length; i++) {
          // console.log("From room delete, deleting bookshelf: " + bookshelves[i].bookshelf_name);
          deleteBookshelf( bookshelves[i].bookshelf_id, true );
      }

    Room.destroy({
      where: {
        room_name: room_name
      }
    }).then( () => {
      Room.sync()
      setFirstLoad(true)
    });
    }
  }

  const handleRoomChange = e =>{
    setSelectedRoom( e.target.value );
    fetchBookshelves( e.target.value )
  };

  const handleBookshelfChange = e =>{
    setSelectedBookshelf( e.target.value);
  };

  return (
    <div className="centered">
      <h1>Update or Delete Location</h1>
      <form onSubmit={handleSubmit}>
      <RoomSelector rooms={rooms} roomChange={handleRoomChange}/>
      <BookshelfSelector bookshelves={bookshelves} bookshelfChange={handleBookshelfChange}/>
      <input className="edit-button" id="submit-btn" type="submit" value="Make these changes" />
      </form>
      <button id="delete-bookshelf-btn" onClick={handleDeleteBookshelf}>Delete this bookshelf</button>
      <button id="delete-room-btn" onClick={handleDeleteRoom}>Delete this room</button>

      <Link to={'/LocationMgr'}>
                  <button className="edit-button" id="locationabortButton">Back to all locations</button>
                  </Link>
    </div>
  );
}

export default EditLocation;
