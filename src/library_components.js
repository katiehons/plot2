import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import imageNotFound from './images/book_blank_cover.png';
import library_db from "./db_connect/sequelize_index"

function RoomMap(room){
  let bookshelves_div = <></>
  if( room.bookshelves )
  {
    bookshelves_div = room["bookshelves"].map( (bookshelf) =>  <div key={bookshelf.bookshelf_name} id="loc-map-bookshelf">{bookshelf.bookshelf_name}</div> )
  }

  return(
    <>
      <div className="loc-map-room" key={room.room_name} >{room.room_name}</div>
      {bookshelves_div} <br/>
    </>
  )
}

function LocationMap(){
  const [firstLoad, setFirstLoad] = useState(true);
  const [rooms, setRooms] = useState([]);

  const Room = library_db.room;
  const Bookshelf = library_db.bookshelf;

  if( firstLoad )
  {
    setFirstLoad(false);
    Room.findAll({raw: true}).then((rooms_returned) => {
      for( let i = 0; i < rooms_returned.length; i++ )
      {
        Bookshelf.findAll({
            where: { room_id: rooms_returned[i].room_id },
                     raw: true}).then((bookshelves_result) => {
              rooms_returned[i].bookshelves = bookshelves_result;
              if (i === ( rooms_returned.length - 1 ) )
              {
                setRooms(rooms_returned);
              }
            });
      }
    });
  }

  return (
    <>
      <h2 id="loc-map-header">All Locations:</h2>
      <span id='locations-map'>{rooms.map((room) => RoomMap(room))}</span>
    </>
  )
}

function LibraryHeader({ name }) {
  return (
    <h1 id='library_name'>The {name} Library</h1>
  )
}

// username button
function makeProfileButton(user, onProfileClick) {
  return (
    <button className="profiles-button" key={user.username} onClick={() => onProfileClick(user.username)}>{user.username}</button>
  )
}

// all username buttons
function ProfileButtons({ profiles, onProfileClick }) {
  return (
    <span id='generated-profilesButtons'>{profiles.map((user) => makeProfileButton(user, onProfileClick))}</span>
  )
}

function BookshelfSelector( {bookshelves, bookshelfChange} )
{
  let bookshelvesList = bookshelves.length > 0 && bookshelves.map((item, i) => {
    return (<option key={i} value={item.bookshelf_id} id={"bookshelf-sel-"+item.bookshelf_id}>{item.bookshelf_name}</option>)
    }, this);
  return(
    <>
      <label className="input-label">Bookshelf: </label>
      <select id="bookshelfsel" onChange={bookshelfChange}>{bookshelvesList}</select>
    </>
  )
}

function RoomSelector({rooms, roomChange})
{
  let roomList = rooms.length > 0 && rooms.map((item, i) => {
    return (<option key={i} value={item.room_id} id={"room-sel-"+item.room_id}>{item.room_name}</option>)
    }, this);

  return(
    <>
      <label className="input-label">Room: </label>
      <select id="roomsel" onChange={roomChange}> {roomList} </select>
    </>
  )
}

function CurrentUser({ user }) {
  return (
    <h3 id='current_user'>Current user: {user}</h3>
  )
}

// generate the book list
function EditBookButton({isbn}) {
  let history = useNavigate();

  return(
    <button type="button" className="edit-button" onClick={() => {
      history("/MetadataEdit?isbn=" + isbn)}}>
      Edit
    </button>
  )
}

function makeBook(book)
{
  //get the image for each cover and set custom image if none found
  var cover;
  if(book.cover != null){
    cover = book.cover;
  }else{
    cover = imageNotFound;
  }

  var title = book.title;
  var isbn = book.isbn;
  var author = book.author;
  var bookshelf = book["bookshelf.bookshelf_name"];
  var room = book["bookshelf.room.room_name"];

  var img_alt_text = title + " cover image"

  return(
    <div key={isbn} className="list-block">
      <img id="cover-block" src={cover} alt={img_alt_text}/>
      <div id="metadata-block">
          <div className="metadata-item" id="title">
          Title: {title}
          </div>
          <div className="metadata-item" id="isbn">
          ISBN: {isbn}
          </div>
          <div className="metadata-item" id="author">
          Author: {author}
          </div>
          <div className="metadata-item" id="author">
          Location: {room}, {bookshelf}
          </div>
          <EditBookButton isbn={isbn}/>
      </div>
    </div>
  )
}

function BookList({ books }) {
  return (
    <div id='book-list'>{books.map((book) => makeBook(book))}</div>
  )
}

//todo, sort this list and the file in a sensible manner
export { BookList, CurrentUser, RoomSelector, BookshelfSelector, LibraryHeader, ProfileButtons, LocationMap }
