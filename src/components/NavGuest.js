import React from 'react'
import {Link} from 'react-router-dom'

export default function NavGuest() {
   return (
      <div className='nav-guest nav'>
         <Link className='nav-link' to='/'>
            <h3>Home</h3>
         </Link>

         <Link className='nav-link' to='/signup'>
            <h3>Sign Up</h3>
         </Link>

         <Link className='nav-link' to='/login'>
            <h3>Log In</h3>
         </Link>
      </div>
   )
}
