import {React, useState} from 'react';
import sendAsync from '../db_connect/renderer';
import { Link } from 'react-router-dom'

function AddLocation()
{
  const[firstLoad, setFirstLoad] = useState( true );
  const[newRoom, setNewRoom] = useState();
  const[newBookshelf, setNewBookshelf] = useState();
  const[rooms, setRooms] = useState([]);
  const[bookshelfRoom, setBookshelfRoom] = useState();

  if( firstLoad )
  {
    console.log("Working on first load…")
    setFirstLoad( false )
    var sql_get_rooms = "SELECT room_name FROM rooms";
    sendAsync(sql_get_rooms).then((result) => {
      console.log("got rooms from db");
      console.log(result);
      if( result.length > 0) {
        setRooms(result);
        setBookshelfRoom(result[0].room_name)
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
    var sql_new_room = "INSERT INTO rooms(room_name) VALUES( ? );";
    var params = [newRoom];
    console.log(params);
    sendAsync(sql_new_room, params).then((result) => console.log(result));

    //todo, handle/process/ display sql errors
    // todo, add the room to the bookshelves dropdown after it exists, maybe just set firstload true?
  }

  const handleBookshelfSubmit = e => {
    e.preventDefault();
    console.log("new bookshelf: " + newBookshelf + " into: " + bookshelfRoom );

    // make new bookshelf
    var sql_new_bookshelf = "INSERT INTO bookshelves(bookshelf_name) VALUES( ? );";
    var bookshelf_params = [newBookshelf];

    // associate bookshelf with room
    var sql_assoc_bookshelf_room = "INSERT INTO rooms_bookshelves SELECT rooms.room_id, bookshelves.bookshelf_id FROM rooms, bookshelves WHERE room_name = ? AND bookshelf_name = ?";
    var room_bookshelf_params = [ bookshelfRoom, newBookshelf ];

    sendAsync(sql_new_bookshelf, bookshelf_params).then((result) =>
    {
      console.log(result);
      sendAsync( sql_assoc_bookshelf_room, room_bookshelf_params ).then((result) => console.log(result));
    });
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
    <form onSubmit={handleRoomSubmit}>
    <input id="new-room" type="text" placeholder="New Room…" onChange={handleNewRoomChange}/>
    <input id="submit-new-room" type="submit" value="Add This Room" />
    <br/>
    </form>

    <form onSubmit={handleBookshelfSubmit}>
    <select id="roomsel" onChange={handleBookshelfRoomChange}> {roomList} </select>
    <input id="new-bookshelf" type="text" placeholder="New Bookshelf…" onChange={handleNewBookshelfChange}/>
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
