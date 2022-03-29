import {React, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import sendAsync from '../db_connect/renderer';
import imageNotFound from '../images/imageNotFound.svg';
const electron = window.require('electron');
const { ipcRenderer } = electron;
const electron_store = window.require('electron-store');
const { store } = electron_store;


function Home() {
  let history = useNavigate();

  // get and set the current user
  function CurrentUser({ user }) {
    console.log("getting user");
    console.log(user);
    return (
      <h3 id='current_user'>Current user: {user}</h3>
    )
  }

  const [user, setUser] = useState([]);
  console.log(user);
  if (user.length === 0) {
    ipcRenderer.invoke('getStoreValue', 'current_user').then((result) => {
      // current_user = result;
      console.log("current user: " + result);
      if( result.length > 0)
      {
        setUser(result);
      }
    }
    );
  }

  // generate the book list
  const editBook = ( isbn ) => {
    console.log("sending " + "/MetadataEdit?isbn=" + isbn )
    history("/MetadataEdit?isbn=" + isbn);
  }

  function makeBook(book)
  {
    console.log("creating " + book.title);

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

    //TODO flexibly generate metadata-block display items

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
        </div>
        <button type="button" className="edit-button" onClick={() => editBook(isbn)}>
          Edit
        </button>
      </p>
    )
  }

  function BookList({books}) {
    console.log("displaying books" + books);
    return (
      <div id='book-list'>{books.map((book) => makeBook(book))}</div>
    )
  }

  const[books, setBooks] = useState([]);

  if( books.length == 0 )
  {
    var sql_get_books = "SELECT * FROM books";
    sendAsync(sql_get_books).then((result) => {
      console.log("got books from db");
      console.log(result);
      if( result.length > 0) {
        setBooks(result);
      }
    });
  }

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
      <CurrentUser user={user}/>
      <BookList books={books}/>
    </div>
  )
}

export default Home;
