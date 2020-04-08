import React from 'react'
import NavGuest from '../components/NavGuest'

export default function GuestLayout(props) {
   return (
      <div>
         <NavGuest/>
         {props.children}
      </div>
   )
}
