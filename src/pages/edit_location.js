import {React, useState} from 'react';
import sendAsync from '../db_connect/renderer';
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
////// todo next: set bookshelf dropdown based on room

  function fetchBookshelves( room )
  {
    // get the bookshelves in that room
    var sql_get_bookshelves = "SELECT bookshelf_name FROM bookshelves JOIN rooms_books ON bookshelves.bookshelf_id = rooms_books.shelf_id JOIN rooms ON rooms.room_id = rooms_books.room_id WHERE rooms.room_name = ?;";

    var params = [room];
    sendAsync(sql_get_bookshelves, params).then((result) => {
      console.log("got shelves from db");
      console.log(result);
      setBookshelves(result);
    });
  }

  if( firstLoad )
  {
    setFirstLoad( false )
    var sql_get_rooms = "SELECT room_name FROM rooms";
    sendAsync(sql_get_rooms).then((result) => {
      console.log("got rooms from db");
      console.log(result);
      if( result.length > 0) {
        setRooms(result);
        fetchBookshelves( result[0].room_name );
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
  const deleteBookshelf = e =>{
    var bookshelf_sel = document.getElementById("bookshelfsel")
    var bookshelf_name = bookshelf_sel.options[bookshelf_sel.selectedIndex].text

    if( window.confirm( "Are you sure you want to delete bookshelf \"" + bookshelf_name + "\"?"))
    {
      var sql_delete_shelf_from_room = "DELETE FROM rooms_books WHERE shelf_id IN (SELECT shelf_id FROM rooms_books JOIN bookshelves ON bookshelves.bookshelf_id = rooms_books.shelf_id WHERE bookshelves.bookshelf_name = ?);"// DELETE FROM bookshelves WHERE bookshelf_name = ?;"
      var sql_delete_shelf = "DELETE FROM bookshelves WHERE bookshelf_name = ?;"

      var params = [bookshelf_name]
      console.log("Trying to delete: " + params)

      sendAsync(sql_delete_shelf_from_room, params).then((result) => {
        console.log(result)
        sendAsync(sql_delete_shelf, params).then((result) => {
          console.log(result)
          console.log( "Current room: " + selectedRoom[""] )
          fetchBookshelves( selectedRoom[""] )
        });
      });
    }
  }

  // const deleteRoom = e =>{
  //   var sql_delete_loc =
  // }

  const handleRoomChange = e =>{
    setSelectedRoom({
      ...selectedRoom,
      [e.target.name]: e.target.value
    });
    console.log(e.target.value )
    fetchBookshelves( e.target.value )
    // // get the bookshelves in that room
    // var sql_get_rooms = "SELECT bookshelf_name, rooms.room_name FROM bookshelves JOIN rooms_books ON bookshelves.bookshelf_id = rooms_books.shelf_id JOIN rooms ON rooms.room_id = rooms_books.room_id WHERE rooms.room_name = ?;"
    //
    // var params = [e.target.value]
    // sendAsync(sql_get_rooms, params).then((result) => {
    //   console.log("got shelves from db");
    //   console.log(result);
    //   setBookshelves(result);
    // });
  };

  const handleBookshelfChange = e =>{
    setSelectedBookshelf({
      ...selectedBookshelf,
      [e.target.name]: e.target.value
    });
    console.log(e.target.value)
    //todo: set the current number of shelves based on which bookshelf
  };

  // const handleShelfChange = e =>{
  //   setSelectedRoom({
  //     ...selectedBookshelf,
  //     [e.target.name]: e.target.value
  //   });
  //   console.log(e.target.value)
  // };
  // <label for="shelfsel">How many shelves? </label>
  // <select id="shelfsel" onChange={handleShelfChange}> {shelvesList} </select>
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
      <button id="delete-bookshelf-btn" onClick={deleteBookshelf}>Delete this bookshelf</button>

      <Link to={'/LocationMgr'}>
                  <button className="edit-button" id="locationabortButton">Back to all locations</button>
                  </Link>
    </div>
  );
}
// <button id="delete-room-btn" onClick={deleteRoom}>Delete this room</button>

export default EditLocation;
