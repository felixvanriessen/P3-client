import React from 'react'
import {Link} from 'react-router-dom'

export default function CarComponent(props) {
   return (
      <Link to={`/car/${props.id}`} className='car-comp'>
         <div className='car-comp-img'>
            <img src={props.image} alt=""/>
         </div>
         <div className='car-comp-text'>
            <h3>{props.name}</h3>
            <h5>{props.km} km</h5>
            <h5>€ {props.price}</h5>
            <p>{props.owner}</p>
         </div>
      </Link>
   )
}
