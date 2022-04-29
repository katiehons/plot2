import { Link } from 'react-router-dom';

function LocationMgr()
{
//todo display all locations on this page
return (
  <div className='centered'>
  <h1>Manage Locations</h1>
  <Link to={'/AddLocation'}>
      <button id="addLocationLinkbtn">Add a location</button>
  </Link>
  <Link to={'/EditLocation'}>
      <button id="editLocationLinkbtn">Delete a location</button>
  </Link>
  </div>
)
}

export default LocationMgr;
