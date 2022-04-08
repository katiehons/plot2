import React from 'react';
import sendAsync from '../db_connect/renderer';
import { Link } from 'react-router-dom'

function AddLocation()
{
  const handleRoomSubmit = e => {
    e.preventDefault();

  }

  return(
    <div className='centered'>
    <h1>Add New Location</h1>
    <form onSubmit={handleRoomSubmit}>

    </form>
    <Link to={'/LocationMgr'}>
                <button className="edit-button" id="locationabortButton">Back to all locations</button>
                </Link>
    </div>
  )
}
export default AddLocation;
