import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Axios from 'axios'
import { getUser } from '../../utils/auth'

export default class SaleCar extends Component {
   constructor(props) {
      super(props)
   }

   removeCar = () => {
      Axios.get(`http://localhost:3004/cars/remove/${this.props.id}`)
      .then(response=>{
         this.props.refresh()
         this.props.history.push('/profile')
      })
      .catch(err=>console.log(err))
   }
   render(){
      return (
         <div className='car-for-sale'>
         <Link to={'/car/'+ this.props.id} className='link-car'>
            <h3>{this.props.name}</h3>
            <h3>{'€ '+ this.props.price}</h3>
         </Link>
         <h3 onClick={this.removeCar}>delete</h3>
         </div>
      )
   }
}
