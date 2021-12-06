import logo from './logo.svg';
import './App.css';
import Navbar from './components/NavbarFiles/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Profiles';
import Setup from './Pages/Setup';
import Search from './Pages/Search';
import AddProfile from './Pages/AddProfile';
import AddBookManually from './Pages/AddBookManually';
import AddBookAPI from './Pages/AddBookAPI';
import MetadataEdit from './Pages/MetadataEdit';

import { useState } from 'react';
// Used for conditional setup
const electron = window.require('electron');
const { ipcRenderer } = electron;
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
        <Switch>
        <Route path='/' exact component={((isSetup) ? Login : Setup)} />
          <Route path='/Login' exact component={Login} />
          <Route path='/Setup' exact component={Setup} />
          <Route path='/AddProfile' exact component={AddProfile} />
          <div>
          <Navbar />
          <Route path='/Home' exact component={Home} />
          <Route path='/Search' exact component={Search} />
          <Route path='/AddBookAPI' exact component={AddBookAPI} />
          <Route path='/AddBookManually' exact component={AddBookManually} />
          <Route path='/MetadataEdit' exact component={MetadataEdit} />
          </div>
        </Switch>
      </Router>
    // </>
  );
}

export default App;
// template code:
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
