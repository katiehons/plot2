import logo from './logo.svg';
import './App.css';
import Navbar from './navbar/navbar_src/navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/profiles';
import Setup from './pages/setup';
import Search from './pages/search';
import AddProfile from './pages/add_profile';
import AddBookManually from './pages/add_book_manually';
import AddBookAPI from './pages/add_book_api';
import MetadataEdit from './pages/metadata_edit';

import { useState } from 'react';
// Used for conditional setup
const { ipcRenderer } = window.require('electron');

// const { ipcRenderer } = require('electron')

// const electron = window.require('electron');
// const { ipcRenderer } = electron;
var firstPage;

function App() {
  // If the PLOT software has not been set up locally, then the setup page is routed to by default.
  // Otherwise, the Login page will greet the user.
  const [isSetup, setIsSetup] = useState([]);

  const checkSetup = async () => {
    const setupState = await ipcRenderer.invoke('getStoreValue','library_setup');
    console.log("library is setup: " + setupState);
    setIsSetup( setupState );
  };

  if(isSetup.length === 0) {
    setIsSetup(false);
    checkSetup();
  };

  return (
    // <>
      <Router>
        <Routes>
        <Route path='/' element={((isSetup) ? Login : Setup)} />
          <Route path='/Login' element={Login} />
          <Route path='/Setup' element={Setup} />
          <Route path='/AddProfile' element={AddProfile} />
          <div>
          <Navbar />
          <Route path='/Home' element={Home} />
          <Route path='/Search' element={Search} />
          <Route path='/AddBookAPI' element={AddBookAPI} />
          <Route path='/AddBookManually' element={AddBookManually} />
          <Route path='/MetadataEdit' element={MetadataEdit} />
          </div>
        </Routes>
      </Router>
    // </>
  );
}

export default App;
// original template code below:

// import logo from './logo.svg';
// import './App.css';
//
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
//
// export default App;
