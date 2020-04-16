import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Axios from 'axios'
import { getUser } from '../../utils/auth'

export default class SaleCar extends Component {
   constructor(props) {
      super(props)
   }

   removeCar = () => {
      Axios.get(`${process.env.REACT_APP_API}/cars/remove/${this.props.id}`)
      .then(car=>{
         this.props.refresh()
         this.props.history.push('/profile')
      })
      .catch(err=>console.log(err))
   }
   render(){
      return (
         <div className='car-for-sale'>
            <Link to={'/car/'+ this.props.id} className='link-car'>
               <h4>{this.props.name}</h4>
               <h4>{'€ '+ this.props.price}</h4>
            </Link>
            <div className='sale-delete'>
               <h4 onClick={this.removeCar}>delete</h4>
            </div>
         </div>
      )
   }
}
