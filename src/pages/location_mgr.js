import { Link } from 'react-router-dom';

function AddLocation()
{

return (
  <div className='centered'>
  <h1>Locations</h1>
  <Link to={'/Home'} id='return-to-home'>
      <button className="edit-button" id="abortButton"> Return to Home</button>
  </Link>
  <Link to={'/AddLocation'}>
      <button className="edit-button" id="addLocationLinkbtn">Add new location</button>
  </Link>
  </div>
)
}

export default AddLocation;
