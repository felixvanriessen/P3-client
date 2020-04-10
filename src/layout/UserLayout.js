import React from 'react'
import NavUser from '../components/NavUser'

export default function UserLayout(props) {
   return (
      <div>
         <NavUser logOut = {props.logOut} />
         {props.children}
      </div>
   )
}