import { Link } from 'react-router-dom';

function LocationMgr()
{
//todo display all locations on this page
return (
  <div className='centered'>
  <h1>Locations</h1>
  <Link to={'/Home'} id='return-to-home'>
      <button className="edit-button" id="abortButton"> Return to Home</button>
  </Link>
  <Link to={'/AddLocation'}>
      <button className="edit-button" id="addLocationLinkbtn">Add a new location</button>
  </Link>
  <Link to={'/EditLocation'}>
      <button className="edit-button" id="editLocationLinkbtn">Edit an existing location</button>
  </Link>
  </div>
)
}

export default LocationMgr;
