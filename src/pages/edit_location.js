import {React, useState} from 'react';
// import sendAsync from '../db_connect/renderer';
import Sequelize from 'sequelize'
import { Link } from 'react-router-dom'

function EditLocation() {
  // todo make these not-array as appropriate
  const[firstLoad, setFirstLoad] = useState( true );
  const[rooms, setRooms] = useState([]);
  const[selectedRoom, setSelectedRoom] = useState( 0 );
  const[bookshelves, setBookshelves] = useState([]);
  const[selectedBookshelf, setSelectedBookshelf] = useState( 0 );
  const[shelves, setshelves] = useState([]);
  const[selectedShelves, setSelectedShelves] = useState([]);

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
      console.log('PROFILES: sequelize Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the sequelize database:', error);
    }
  })();

  const Bookshelf = require('../db_connect/models/bookshelf')(sequelize);
  const Room = require('../db_connect/models/room')(sequelize);


  function fetchBookshelves( room )
  {
    console.log("Fetching bookshelves..." + room )
    // get the bookshelves in that room
    Bookshelf.findAll({raw: true}).then((bookshelves) => {
      console.log("bookshelves: " + bookshelves)
      setBookshelves( bookshelves );
      if( bookshelves.length > 0 )
      {
        setSelectedBookshelf( bookshelves.[0].bookshelf_name );
      }
      else
      {
        setSelectedBookshelf("");
      }
    });
  }

  if( firstLoad )
  {
    console.log("Working on first load…")
    setFirstLoad( false )
    Room.findAll({raw: true}).then((rooms) => {
      console.log("rooms: " + rooms)
          setRooms(rooms);
          if( rooms.length > 0 )
          {
            setSelectedRoom( rooms[0].room_name );
            fetchBookshelves( rooms[0].room_name );
          }
          else
          {
            setSelectedRoom("")
          }
        });
  }

  let roomList = rooms.length > 0 && rooms.map((item, i) => {
  return (
    <option key={i} value={item.room_name}>{item.room_name}</option>
  )
  }, this);

  let bookshelvesList = bookshelves.length > 0 && bookshelves.map((item, i) => {
  return (
    <option key={i} value={item.bookshelf_name}>{item.bookshelf_name}</option>
  )
  }, this);


/// from add book pg, needs rework!!! todotodotodo vvvvvvvvvvvvv
  const [state, setState] = useState({ author: "", book: "", isbn: "" });
  const handleSubmit = e => {
    e.preventDefault();
    //display success or failure message
    console.log(state);
  };

///^^^^^^^^^^^^^^^^^^
  function deleteBookshelf( bookshelf )
  {
    Bookshelf.destroy({
      where: {
        bookshelf_name: bookshelf
      }
    }).then( () => {
      Bookshelf.sync()
      console.log( "Current room: " + selectedRoom[""] );
      fetchBookshelves( selectedRoom[""] );
    });
  }

  const handleDeleteBookshelf = e =>{
    var bookshelf_sel = document.getElementById("bookshelfsel")
    var bookshelf_name = bookshelf_sel.options[bookshelf_sel.selectedIndex].text

    if( window.confirm( "Are you sure you want to delete bookshelf \"" + bookshelf_name + "\"?\nThis will unset location for all books on this shelf."))
    {
      deleteBookshelf( bookshelf_name );
    }
  }

  const handleDeleteRoom = e =>{
    var room_sel = document.getElementById("roomsel")
    var room_name = room_sel.options[room_sel.selectedIndex].text

    if( window.confirm( "Are you sure you want to delete room \"" + room_name + "\"?\nThis will also delete all bookshelves in this room."))
    {
      // this takes care of deleting bookshelfs and room-bookshelf associations
      for (var i = 0; i < bookshelves.length; i++) {
          console.log(bookshelves[i].bookshelf_name);
          deleteBookshelf( bookshelves[i].bookshelf_name );
      }

    Room.destroy({
      where: {
        room_name: room_name
      }
    }).then( () => {
      Room.sync()
        // todo re-fetch rooms
    });
    }
  }


  const handleRoomChange = e =>{
    setSelectedRoom({
      ...selectedRoom,
      [e.target.name]: e.target.value
    });
    console.log(e.target.value )
    fetchBookshelves( e.target.value )
  };

  const handleBookshelfChange = e =>{
    setSelectedBookshelf({
      ...selectedBookshelf,
      [e.target.name]: e.target.value
    });
    console.log(e.target.value)
  };

  return (
    <div className="centered">
      <h1>Update or Delete Location</h1>
      <form onSubmit={handleSubmit}>
      <label for="roomsel">Which room? </label>
      <select id="roomsel" onChange={handleRoomChange}> {roomList} </select>
      <br/>
      <label for="bookshelfsel">Which bookshelf? </label>
      <select id="bookshelfsel" onChange={handleBookshelfChange}>{bookshelvesList}</select>
      <br/>
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
