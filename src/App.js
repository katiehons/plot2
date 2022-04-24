import logo from './logo.svg';
import './App.css';
// import Navbar from './navbar/navbar_src/navbar';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AppLoading from './pages/app_loading';
import Home from './pages/home';
import Login from './pages/profiles';
import Setup from './pages/setup';
import Search from './pages/search';
import AddProfile from './pages/add_profile';
import AddBookManually from './pages/add_book_manually';
import AddBookAPI from './pages/add_book_api';
import MetadataEdit from './pages/metadata_edit';
import LocationMgr from './pages/location_mgr';
import EditLocation from './pages/edit_location';
import AddLocation from './pages/add_location';
import BrowseLocations from './pages/browse_locations';


import { useState, Fragment } from 'react';
// Used for conditional setup
const { ipcRenderer } = window.require('electron');

var firstPage;

function App() {
  // If the PLOT software has not been set up locally, then the setup page is routed to by default.
  // Otherwise, the Login page will greet the user.
  const [isLoaded, setIsLoaded] = useState(false)
  const [isSetup, setIsSetup] = useState(null);

  console.log(isSetup)
  if( !isLoaded )
  {
    console.log("loading setup state...")
    ipcRenderer.invoke('getStoreValue','library_setup').then( (setupResult) => {
      setIsSetup(setupResult, setIsLoaded(true))
    })
  }

  console.log(isSetup)
  return (
    <>
    <Router>
      <Routes>
        <Route exact path='/' element={( isLoaded ? ( isSetup ? <Login />: <Setup /> ) : <AppLoading /> )} />
        <Route exact path='/AppLoading' element={<AppLoading />} />
        <Route exact path='/Login' element={<Login />} />
        <Route exact path='/Setup' element={<Setup />} />
        <Route exact path='/AddProfile' element={<AddProfile />} />
        <Route exact path='/Home' element={<Home />} />
        <Route exact path='/Search' element={<Search />} />
        <Route exact path='/AddBookAPI' element={<AddBookAPI />} />
        <Route exact path='/AddBookManually' element={<AddBookManually />} />
        <Route exact path='/MetadataEdit' element={<MetadataEdit />} />
        <Route exact path='/LocationMgr' element={<LocationMgr />} />
        <Route exact path='/EditLocation' element={<EditLocation />} />
        <Route exact path='/AddLocation' element={<AddLocation />} />
        <Route exact path='/BrowseLocations' element={<BrowseLocations />} />

      </Routes>
    </Router>
    </>
  );
}

export default App;
