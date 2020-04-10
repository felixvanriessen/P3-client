import React, { Component } from 'react'
import Axios from 'axios'
import GuestLayout from '../../layout/GuestLayout'

export default class CarInfo extends Component {
   state = {
      car:{
         owner:{}
      }
   }

   componentDidMount(){
      Axios.get(`http://localhost:3004/cars/find/${this.props.match.params.id}`)
      .then(carfound=>{
         this.setState({
            car:carfound.data
         })
      })
   }

   render() {
      return (
         <GuestLayout>
            <div className='car-info-container'>
               <div className="car-info">
                  <h2>{this.state.car.name}</h2>
                  <img src={this.state.car.image} alt=""/>
                  <p>{this.state.car.year}</p>
                  <p>{this.state.car.price}</p>
               </div>
               <div className='car-owner-info'>
                  <p>{this.state.car.owner.username}</p>
                  <p>{this.state.car.owner.email}</p>
                  <p>{this.state.car.owner.tel}</p>
               </div>
            </div>
         </GuestLayout>
      )
   }
}

