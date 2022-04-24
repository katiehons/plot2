import { Link, useNavigate } from 'react-router-dom';

function BookshelfSelector( {bookshelves, bookshelfChange} )
{
  let bookshelvesList = bookshelves.length > 0 && bookshelves.map((item, i) => {
    return (<option key={i} value={item.bookshelf_id} id={"bookshelf-sel-"+item.bookshelf_id}>{item.bookshelf_name}</option>)
    }, this);
  return(
    <div id="bookshelf-selector">
      <label for="bookshelfsel">Which bookshelf? </label>
      <select id="bookshelfsel" onChange={bookshelfChange}>{bookshelvesList}</select>
    </div>
  )
}
function RoomSelector({rooms, roomChange})
{
  let roomList = rooms.length > 0 && rooms.map((item, i) => {
    return (<option key={i} value={item.room_id} id={"room-sel-"+item.room_id}>{item.room_name}</option>)
    }, this);

  return(
    <div id="room-selector">
      <label for="roomsel">Which room? </label>
      <select id="roomsel" onChange={roomChange}> {roomList} </select>
    </div>
  )
}

function CurrentUser({ user }) {
  return (
    <h3 id='current_user'>Current user: {user}</h3>
  )
}

// generate the book list
function EditBookButton({isbn}) {
  console.log("making button for: ")
  console.log( isbn )
  let history = useNavigate();

  return(
    <button type="button" className="edit-button" onClick={() => {
      console.log("EditBookButton sending you to MetadataEdit page with ISBN ")
      console.log(isbn)
      history("/MetadataEdit?isbn=" + isbn)}}>
      Edit
    </button>
  )
}

function makeBook(book)
{
  console.log("lookin at book:")
  console.log( book)
  //get the image for each cover and set custom image if none found
  // var cover;
  // if(book.cover != null){
  //   cover = book.cover;
  // }else{
  //   cover = imageNotFound;
  // }

  var title = book.title;
  var isbn = book.isbn;
  var author = book.author;
  var bookshelf = book["bookshelf.bookshelf_name"];
  var room = book["bookshelf.room.room_name"];

  return(
    <p class="list-block">
      <div id="metadata-block">
          <div class="metadata-item" id="title">
          Title: {title}
          </div>
          <div class="metadata-item" id="isbn">
          ISBN: {isbn}
          </div>
          <div class="metadata-item" id="author">
          Author: {author}
          </div>
          <div class="metadata-item" id="author">
          Location: {room}, {bookshelf}
          </div>
      </div>
      <EditBookButton isbn={isbn}/>
    </p>
  )
}

function BookList({ books }) {
  let history = useNavigate();

  console.log("displaying books" + books);
  return (
    <div id='book-list'>{books.map((book) => makeBook(book))}</div>
  )
}

export { BookList, CurrentUser, RoomSelector, BookshelfSelector }
