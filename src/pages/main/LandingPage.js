import React, {Component} from 'react'
import GuestLayout from '../../layout/GuestLayout'
import axios from 'axios'
import CarComponent from './CarComponent'


export default class LandingPage extends Component {
   state={
      cars:[],
      carsfound:[]
   }
   componentDidMount(){
      axios.get(`http://localhost:3004/cars/all`)
      .then(response=>{
         this.setState({
            cars:response.data,
            carsfound:response.data
         })
      })
      .catch(err=>console.log(err))
   }

   searchCars = (e) => {
      let foundcars = this.state.cars.filter(car=>{
         if (car.name.toLowerCase().includes(e.target.value.toLowerCase())) return true
      })
      this.setState({
         carsfound:foundcars
      })
   }

   render(){
      return (
         <GuestLayout>
            <div className='main-header'>
               <h1>Title here</h1>
               <h4>And a short description, motto, tagline.</h4>
            </div>
            <div className='search-container'>
               <input type="text" onChange={this.searchCars}/>
            </div>
            <div className='search-results'>
               {this.state.carsfound.map(car=>(
                  <CarComponent
                     name={car.name}
                     price={car.price}
                  />
               ))}
            </div>
         </GuestLayout>
      )
   }
}
