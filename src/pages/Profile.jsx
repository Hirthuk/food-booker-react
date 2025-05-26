import React from 'react'
import Login from '../components/Login';

const Profile = () => {
  const userExists = undefined;

  if(userExists) {
    return (
        <main>User Details</main>
    )
  }

  return (
    <div className='bg-[#FFDCDC] rounded-md'>
     <Login/>
    </div>
   
  )
}

export default Profile
