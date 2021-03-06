import { React, useState } from 'react';
import { BookList, CurrentUser, LibraryHeader } from "../library_components"
import library_db from "../db_connect/sequelize_index"

const electron = window.require( 'electron' );
const { ipcRenderer } = electron;

const Book = library_db.book;
const Bookshelf = library_db.bookshelf;
const Room = library_db.room;

function Home() {
  const [firstLoad, setFirstLoad] = useState( true )
  const [libName, setLibName] = useState();
  const [user, setUser] = useState(null);
  const[books, setBooks] = useState([]);

  // get current user and all books
  if ( firstLoad ) {
    setFirstLoad(false);
    ipcRenderer.invoke('getStoreValue', 'library_name').then((result) => {
      setLibName(result);
    })

    ipcRenderer.invoke('getStoreValue', 'current_user').then((result) => {
      if( result.length > 0)
      {
        setUser(result);
      }
    });

    Book.findAll({raw: true,
                  include: {
                    model: Bookshelf,
                    attributes: ["bookshelf_name"],
                    include: {
                      model:Room,
                      attributes: ["room_name"]
                    }}}
                  ).then((books_result) => {
      setBooks( books_result );
    });
  }

  return (
    <div className='home'>
      <LibraryHeader name={libName}/>
      <CurrentUser user={user}/>
      <BookList books={books}/>
    </div>
  )
}
export default Home;
