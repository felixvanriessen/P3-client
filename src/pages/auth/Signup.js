import React, { Component } from 'react'
import GuestLayout from '../../layout/GuestLayout'
import {signup} from '../../utils/auth'
import Axios from 'axios'


export default class Signup extends Component {

   state = {
      user:{}
   }
   
   formHandler = (e) => {
      let formdata = {...this.state.user}
      formdata[e.target.name] = e.target.value
      this.setState({
         user:formdata
      })
   }

   submitHandler = (e) => {
      e.preventDefault()
      signup(this.state.user)
      .then((response)=>{
         this.props.history.push('/login')
      })
      .catch(err=>console.log(err))
   }

   checkUserExists = (username) => {
      
   }


   render() {
      return (
         <GuestLayout>
            <form className='signup' onSubmit={this.submitHandler}>
               <input name="username" type="text" onChange={this.formHandler} placeholder="username" required/>
               <input name="email" type="text" onChange={this.formHandler} placeholder="email"/>
               <input name="tel" type="text" onChange={this.formHandler} placeholder="tel" required/>
               <input name="password" type="password" onChange={this.formHandler} placeholder="password" required/>
               <button type='submit'>Sign Up</button>
            </form>
         </GuestLayout>
      )
   }
}
