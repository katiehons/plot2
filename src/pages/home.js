import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { Sequelize } from 'sequelize';
import library_db from "../db_connect/sequelize_index"
import imageNotFound from '../images/imageNotFound.svg';

const electron = window.require( 'electron' );
const { ipcRenderer } = electron;
const electron_store = window.require( 'electron-store' );
const { store } = electron_store;

const Book = library_db.book;
const Bookshelf = library_db.bookshelf;
const Room = library_db.room;

function Home() {
  let history = useNavigate();
  const [user, setUser] = useState(null);
  const[books, setBooks] = useState([]);


  // get and set the current user
  function CurrentUser({ user }) {
    return (
      <h3 id='current_user'>Current user: {user}</h3>
    )
  }

  if ( user == null ) {
    ipcRenderer.invoke('getStoreValue', 'current_user').then((result) => {
      if( result.length > 0)
      {
        setUser(result);
      }
    });
  }

  // generate the book list
  const editBook = ( isbn ) => {
    history("/MetadataEdit?isbn=" + isbn);
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
    // var bookshelf_id = book.bookshelf_id;
    var bookshelf = book["bookshelf.bookshelf_name"];
    var room = book["bookshelf.room.room_name"];
    // if( book.bookshelf.bookshelf_name != null)
    // {
    //   bookshelf = book.bookshelf.bookshelf_name;
    // }
    // var bookshelf = book.bookshelf.bookshelf_name;

    // was formerly immediately above id="title" div
    // <img id="cover-block" src={cover}/>

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
        <button type="button" className="edit-button" onClick={() => editBook(isbn)}>
          Edit
        </button>
      </p>
    )
  }

  function BookList({ books }) {
    console.log("displaying books" + books);
    return (
      <div id='book-list'>{books.map((book) => makeBook(book))}</div>
    )
  }


  if( books.length == 0 )
  {
    Book.findAll({raw: true,
                  // include: { Bookshelf }
                  include: {
                    model: Bookshelf,
                    attributes: ["bookshelf_name"],
                    // as: "bookshelf",
                    include: {
                      model:Room,
                      attributes: ["room_name"]
                    }}}
                    // as: "bookshelf",
                    // attributes: ["bookshelf_id", "bookshelf_name", "room_id"]}}
                  ).then((books_result) => {
      console.log("(home)All books:", books_result);
      setBooks( books_result );
    });
  }
// for-each html tags to generate header/headers/list
  return (
    <div className='home'>
      <h1>Home</h1>
      <Link to={'/Login'} id='loginlink'>
        <button id="loginlinkbtn" className="homepage-nav-button">Switch Profiles</button>
      </Link>
      <Link to={'/Search'} id='searchlink'>
        <button id="searchlinkbtn" className="homepage-nav-button">Search</button>
      </Link>
      <Link to={'/AddBookAPI'} id='addbooklink'>
        <button id="addbooklinkbtn" className="homepage-nav-button">Add new book</button>
      </Link>
      <Link to={'/LocationMgr'} id='location_mgrlink'>
        <button id="location_mgrlinkbtn" className="homepage-nav-button">Location Manager</button>
      </Link>
      <CurrentUser user={user}/>
      <BookList books={books}/>
    </div>
  )
}

export default Home;
