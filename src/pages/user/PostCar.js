import React, { Component } from 'react'
import axios from 'axios'
import qs from 'qs'
import { getUser } from '../../utils/auth'

export default class PostCar extends Component {

   state = {
      newcar:{}
   }

   componentDidMount(){
      let carowner = getUser()
      let car = {
         owner:carowner._id
      }
      this.setState({
         newcar:car
      })
   }

   formHandler = (e) => {
      let car = {...this.state.newcar}
      car[e.target.name] = e.target.value
      this.setState({
         newcar:car
      })
   }

   postCar= () => {
      axios({
         method:"POST",
         url:'http://localhost:3004/cars/new',
         withCredentials:true,
         headers:{
            "content-type":"application/x-www-form-urlencoded"
         },
         data:qs.stringify(this.state.newcar)
      })
      .then(response=> {
         console.log('success')
         console.log(response.data)
      })
      .catch(err=>console.log(err))
   }

   render() {
      return (
         <div className='postcar-container'>
            <div>
               <form onSubmit={this.postCar} onChange={this.formHandler}>
                  <input type="text" name='name' placeholder='Brand name and model'/>
                  <input type="text" name='price' placeholder='price'/>
                  <input type="text" name='kilometers' placeholder='kilometers'/>
                  <input type="text" name='year' placeholder='year'/>
                  <input type="text" name='image' placeholder='image'/>
                  <button type='submit'>POST</button>
               </form>
            </div>
         </div>
      )
   }
}
