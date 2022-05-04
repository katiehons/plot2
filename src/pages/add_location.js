import {React, useState} from 'react';
import { RoomSelector } from "../library_components";
import library_db from "../db_connect/sequelize_index"

const Bookshelf = library_db.bookshelf;
const Room = library_db.room;

function AddLocation()
{
  const[firstLoad, setFirstLoad] = useState( true ); //rename to something like reload/load?
  const[newRoom, setNewRoom] = useState();
  const[newBookshelf, setNewBookshelf] = useState();
  const[rooms, setRooms] = useState([]);
  const[bookshelfRoom, setBookshelfRoom] = useState(null);

  if( firstLoad )
  {
    setFirstLoad( false )
    Room.findAll({raw: true}).then((rooms) => {
          setRooms(rooms);
          if( rooms.length > 0 )
          {
            setBookshelfRoom( rooms[0].room_id );
            //todo: handle when this was already selected to some different dropdown val
          }
          else
          {
            setBookshelfRoom(null)
          }
        });
  }

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

    Bookshelf.create({
      bookshelf_name: newBookshelf,
      room_id: bookshelfRoom
    }).then( (result) => {
      Bookshelf.sync();
      document.getElementById('new-bookshelf-name').value = "";
      setNewBookshelf("");
    })
  }

  const handleNewRoomChange = e => {
    setNewRoom(e.target.value);
  };

  const handleBookshelfRoomChange = e =>{
    setBookshelfRoom( e.target.value );
  };

  const handleNewBookshelfChange = e => {
    setNewBookshelf(e.target.value);
  };

  return(
    <div className='centered'>
    <h1>Add New Location</h1>
    <form onSubmit={handleRoomSubmit} id="new-room-form">
    <label className="input-label">New Room</label> <br/>
    <input id="new-room" type="text" placeholder="Room Name…" onChange={handleNewRoomChange}/> <br/>
    <input id="submit-new-room" type="submit" value="Add This Room" />
    </form>
    <br/> <br/>
    <form onSubmit={handleBookshelfSubmit} id="new-bookshelf-form">
    <label for="new-bookshelf-name" id="new-bookshelf-label" className="input-label" >New Bookshelf</label><br/>
    <RoomSelector rooms={rooms} roomChange={handleBookshelfRoomChange}/><br/>
    <input id="new-bookshelf-name" type="text" placeholder="Bookshelf Name…" onChange={handleNewBookshelfChange}/><br/>
    <input id="submit-new-room" type="submit" value="Add This Bookshelf" /><br/>
    </form>
    </div>
  )
}
export default AddLocation;
