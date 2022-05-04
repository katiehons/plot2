import {React, useState} from 'react';
import { RoomSelector, BookshelfSelector } from "../library_components";
import library_db from "../db_connect/sequelize_index";

const Bookshelf = library_db.bookshelf;
const Room = library_db.room;

function EditLocation() {
  const[firstLoad, setFirstLoad] = useState( true );
  const[rooms, setRooms] = useState([]);
  const[selectedRoom, setSelectedRoom] = useState( null );
  const[bookshelves, setBookshelves] = useState([]);

  function fetchBookshelves( room_id )
  {
    Bookshelf.findAll({
      where: {
      room_id: room_id
      },
      raw: true}).then((bookshelves_result) => {
        setBookshelves( bookshelves_result );
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
          }
        });
  }

  function deleteBookshelf( bookshelf_id, from_room_delete=false )
  {
    Bookshelf.destroy({
      where: {
        bookshelf_id: bookshelf_id
      }
    }).then( () => {
      Bookshelf.sync()
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
          deleteBookshelf( bookshelves[i].bookshelf_id, true );
      }

    Room.destroy({
      where: {
        room_id: room_id
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
    //todo, now that we're not using selectedbookshelf, is there something we should do in this function?
  };

  return (
    <div className="centered">
      <h1>Delete a Location</h1>
      <RoomSelector rooms={rooms} roomChange={handleRoomChange}/>
      <button id="delete-room-btn" onClick={handleDeleteRoom}>Delete this room</button><br/>
      <BookshelfSelector bookshelves={bookshelves} bookshelfChange={handleBookshelfChange}/>
      <button id="delete-bookshelf-btn" onClick={handleDeleteBookshelf}>Delete this bookshelf</button><br/>
    </div>
  );
}

export default EditLocation;
