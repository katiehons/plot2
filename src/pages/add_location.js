import {React, useState} from 'react';
import sendAsync from '../db_connect/renderer';
import { Link } from 'react-router-dom'

function AddLocation()
{
  // async function get_next_id( table )
  // {
  //   var sql_get_high_id = "SELECT MAX(room_id) FROM rooms;";
  //   var params;
  //   if( table == "rooms")
  //   {
  //     params = ["room_id", "rooms"];
  //   }
  //   else if( table == "bookshelves" )
  //   {
  //     params = ["bookshelf_id", "bookshelves"]
  //   }
  //   console.log(params)
  //   return await sendAsync( sql_get_high_id, params);
  // }

  const[newRoom, setNewRoom] = useState();

  const handleRoomSubmit = e => {
    e.preventDefault();
    var sql_new_room = "INSERT INTO rooms VALUES( ?, ? )";
    // get_next_id( "rooms" ).then((result) =>
    // {
    //   console.log(result);
    // });
    //todo, recreate the tables with autoincrement
  }

  const handleBookshelfSubmit = e => {
    e.preventDefault();

  }

  const handleNewRoomChange = e => {
    console.log(e.target.value);
    setNewRoom(e.target.value);
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

    </form>
    <Link to={'/LocationMgr'}>
                <button className="edit-button" id="locationabortButton">Back to all locations</button>
                </Link>
    </div>
  )
}
export default AddLocation;
