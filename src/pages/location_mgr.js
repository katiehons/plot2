import { Link } from 'react-router-dom';
import { LocationMap } from '../library_components'
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
  </Link> <br/> <br/>
  <LocationMap/>
  </div>
)
}

export default LocationMgr;
