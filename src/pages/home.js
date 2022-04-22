import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sequelize, associate } from 'sequelize';
import imageNotFound from '../images/imageNotFound.svg';

const electron = window.require( 'electron' );
const { ipcRenderer } = electron;
const electron_store = window.require( 'electron-store' );
const { store } = electron_store;


function Home() {
  let history = useNavigate();
  const [user, setUser] = useState([]);


  // get and set the current user
  function CurrentUser({ user }) {
    return (
      <h3 id='current_user'>Current user: {user}</h3>
    )
  }

  if ( user.length === 0 ) {
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

  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './data/library.db',
    define: {
      timestamps: false
    }
  });

  (async function(){
    try {
      await sequelize.authenticate();
      Book.associate()
      Bookshelf.associate()
      Room.associate()
      console.log('sequelize Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the sequelize database:', error);
    }
  })();

  const[books, setBooks] = useState([]);

  const Book = require('../db_connect/models/book')(sequelize)
  const Bookshelf = require('../db_connect/models/bookshelf')(sequelize)
  const Room = require('../db_connect/models/room')(sequelize)
  // Book.associate()
  // Bookshelf.associate()
  // Room.associate()

  if( books.length == 0 )
  {
    Book.findAll({raw: true, include: Bookshelf}).then((books) => {
      console.log("(home)All books, before stringify:", books);
      setBooks( books );
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
