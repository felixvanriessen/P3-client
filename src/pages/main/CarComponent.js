import React from 'react'

export default function CarComponent(props) {
   return (
      <div>
         <h3>{props.name}</h3>
         <h5>{props.price} euro</h5>
      </div>
   )
}
