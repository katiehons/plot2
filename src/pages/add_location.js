import {React, useState} from 'react';
import Sequelize from 'sequelize'
import { Link } from 'react-router-dom'

function AddLocation()
{
  const[firstLoad, setFirstLoad] = useState( true ); //rename to something like reload/load
  const[newRoom, setNewRoom] = useState();
  const[newBookshelf, setNewBookshelf] = useState();
  const[rooms, setRooms] = useState([]);
  const[bookshelfRoom, setBookshelfRoom] = useState();

  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './data/library.db',
    define: {
      timestamps: false
    }
  });

  (async function() {
    try {
      await sequelize.authenticate();
      console.log('Metadata: sequelize Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the sequelize database:', error);
    }
  })();

  const Bookshelf = require('../db_connect/models/bookshelf')(sequelize);
  const Room = require('../db_connect/models/room')(sequelize);



  if( firstLoad )
  {
    console.log("Working on first load…")
    setFirstLoad( false )
    Room.findAll({raw: true}).then((rooms) => {
      console.log("rooms: " + rooms)
          setRooms(rooms);
          if( rooms.length > 0 )
          {
            setBookshelfRoom( rooms[0].room_name );
            //todo: handle when this was already selected to some different dropdown val
          }
          else
          {
            setBookshelfRoom("")
          }
        });
  }

  let roomList = rooms.length > 0 && rooms.map((item, i) => {
  return (
    <option key={i} value={item.room_name}>{item.room_name}</option>
  )
  }, this);

  const handleRoomSubmit = e => {
    e.preventDefault();
    Room.create({
      room_name: newRoom
    }).then( () => {
      Room.sync();
      setFirstLoad(true);
      document.getElementById('new-room-form').reset();
    });

    //todo, handle/process/ display sql errors
  }

  const handleBookshelfSubmit = e => {
    e.preventDefault();
    console.log("new bookshelf: " + newBookshelf + " into: " + bookshelfRoom );

    Bookshelf.create({
      bookshelf_name: newBookshelf
    }).then( (result) => {
      console.log(result);
      sequelize.query(
        "INSERT INTO rooms_bookshelves SELECT rooms.room_id, bookshelves.bookshelf_id FROM rooms, bookshelves WHERE room_name = ? AND bookshelf_name = ?",
        { replacements: [ bookshelfRoom, newBookshelf ],
          raw: true })
        .then((result) => {
          document.getElementById('new-bookshelf-name').value = "";
          setNewBookshelf("");
          console.log(result);
        });
    })
  }

  const handleNewRoomChange = e => {
    console.log(e.target.value);
    setNewRoom(e.target.value);
  };

  const handleBookshelfRoomChange = e =>{
    setBookshelfRoom( e.target.value );
    console.log( bookshelfRoom )
  };

  const handleNewBookshelfChange = e => {
    console.log(e.target.value);
    setNewBookshelf(e.target.value);
  };

  return(
    <div className='centered'>
    <h1>Add New Location</h1>
    <form onSubmit={handleRoomSubmit} id="new-room-form">
    <input id="new-room" type="text" placeholder="New Room…" onChange={handleNewRoomChange}/>
    <input id="submit-new-room" type="submit" value="Add This Room" />
    <br/>
    </form>

    <form onSubmit={handleBookshelfSubmit} id="new-bookshelf-form">
    <select id="roomsel" onChange={handleBookshelfRoomChange}> {roomList} </select>
    <input id="new-bookshelf-name" type="text" placeholder="New Bookshelf…" onChange={handleNewBookshelfChange}/>
    <input id="submit-new-room" type="submit" value="Add This Bookshelf" />
    <br/>
    </form>
    <Link to={'/LocationMgr'}>
                <button id="locationabortButton">Back to all locations</button>
                </Link>
    </div>
  )
}
export default AddLocation;
