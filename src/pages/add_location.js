import {React, useState} from 'react';
import sendAsync from '../db_connect/renderer';
import { Link } from 'react-router-dom'


function AddLocation() {
  const[rooms, setRooms] = useState([]);
  const[selectedRoom, setSelectedRoom] = useState([]);
////// todo next: set bookshelf dropdown based on room

  if( rooms.length == 0 )
  {
    var sql_get_rooms = "SELECT DISTINCT room FROM locations";
    sendAsync(sql_get_rooms).then((result) => {
      console.log("got rooms from db");
      console.log(result);
      if( result.length > 0) {
        setRooms(result);
      }
    });
  }

  let roomList = rooms.length > 0 && rooms.map((item, i) => {
  return (
    <option key={i} value={item.room}>{item.room}</option>
  )
  }, this);



/// from add book pg, needs rework!!! vvvvvvvvvvvvv
  const [state, setState] = useState({ author: "", book: "", isbn: "" });
  const handleSubmit = e => {
    e.preventDefault();
    //log state.author, state.book, state.isbn to the database instead of console
    //display success or failure message
    console.log(state);
    if( state.isbn.length == 0 )
    {
      window.alert("Please enter an ISBN");
    }
    else if( isNaN(state.isbn) )
    {
      window.alert("ISBN must be a number");
    }
    else if (window.confirm("Add " + state.title + ", " + state.isbn + " by " + state.author + "?") ){
      var sqlInsert = "INSERT INTO books(isbn, title, author)\nVALUES(?, ?, ?);";
      var params = [state.isbn, state.title, state.author];
      console.log("sql string: \n" + sqlInsert)
      sendAsync(sqlInsert, params).then((result) => console.log(result));
    }
  };
  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };
///^^^^^^^^^^^^^^^^^^
  const handleRoomChange = e =>{
    setSelectedRoom({
      ...selectedRoom,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="centered">
      <h1>Add Location</h1>
      <form onSubmit={handleSubmit}>
      <label for="room">Which room? </label>
      <select id="roomsel" onChange={handleRoomChange}> {roomList} </select>
      <br/>

      <input className="edit-button" id="submit-btn" type="submit" value="Add Location" />
      </form>

      <Link to={'/LocationMgr'}>
                  <button className="edit-button" id="locationabortButton">Back to all locations</button>
                  </Link>
    </div>
  );
}

export default AddLocation;
