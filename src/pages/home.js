import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookList } from "../library_components"
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

  if( books.length == 0 )
  {
    Book.findAll({raw: true,
                  include: {
                    model: Bookshelf,
                    attributes: ["bookshelf_name"],
                    include: {
                      model:Room,
                      attributes: ["room_name"]
                    }}}
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
