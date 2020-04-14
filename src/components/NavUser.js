import React from 'react'
import {Link} from 'react-router-dom'
import {logout} from '../utils/auth'


export default function NavUser(props) {

   return (
      <div className='nav-user nav'>
         <Link to='/' className='nav-link'>
         <h3>Home</h3>
         </Link>
         <Link className='nav-link' onClick={props.logOut}>
         <h3>Log Out</h3>
         </Link>
      </div>
   )
}
