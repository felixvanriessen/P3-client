import React from 'react'
import {Link} from 'react-router-dom'
import {logout} from '../utils/auth'


export default function NavUser(props) {

   return (
      <div className='nav-user nav'>
         <Link to='/' className='nav-link'>HOME</Link>
         <button className='nav-link' onClick={props.logOut}>LogOut</button>
      </div>
   )
}
