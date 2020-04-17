import React, { Component } from 'react'
import axios from 'axios'
import qs from 'qs'
import { getUser } from '../../utils/auth'

export default class PostCar extends Component {

   state = {
      newcar:{}, //car object to add to database
   }

   //set 'owner' property of state.newcar to the '_id'(ObjectId) of the user
   componentDidMount(){
      let carowner = getUser()
      let car = {
         owner:carowner._id
      }
      this.setState({
         newcar:car
      })
   }

   //update state.newcar with input values
   formHandler = (e) => {
      let car = {...this.state.newcar}
      car[e.target.name] = e.target.value
      this.setState({
         newcar:car
      })
   }

   //submit new car
   postNewCar = (e) => {
      e.preventDefault()
      axios({
         method:'post',
         url:`${process.env.REACT_APP_API}/cars/new`,
         withCredentials:true,
         headers:{
            "content-type":"application/x-www-form-urlencoded"
         },
         data:qs.stringify(this.state.newcar)
      })
      .then(response => {
         this.props.history.push(`/car/${response.data._id}`)
      })
      .catch(err=>console.log(err))
   }

   render() {
      return (
         <div className='postcar-container'>
               <form className='postcar-form' onSubmit={this.postNewCar} onChange={this.formHandler}>
                  <input type="text" name='name' placeholder='brand and model' required pattern='^[a-z0-9A-Z +-]{1,20}$' title='Alphabetic characters and Numbers only'/>
                  <input type="text" name='price' placeholder='price' required pattern='^[0-9]{1,9}$' title='Numbers only'/>
                  <input type="text" name='kilometers' placeholder='kilometers' pattern='^[0-9]{1,6}$' title='Numbers only'/>
                  <input type="text" name='year' placeholder='year' pattern='^[0-9]{4}$' title='Numbers only'/>
                  <input type="text" name='image' placeholder='image url'/>
                  <button type='submit'>POST</button>
               </form>
         </div>
      )
   }
}
