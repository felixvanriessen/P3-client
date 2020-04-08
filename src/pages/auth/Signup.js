import React, { Component } from 'react'
import GuestLayout from '../../layout/GuestLayout'
import {signup} from '../../utils/auth'


export default class Signup extends Component {

   state = {
      user:{}
   }

   submitHandler = (e) => {
      e.preventDefault()
      signup(this.state.user)
      .then(()=>{
         console.log('success')
      })
      .catch(err=>console.log(err))
   }

   formHandler = (e) => {
      let formdata = {...this.state.user}
      formdata[e.target.name] = e.target.value
      console.log(formdata)
      this.setState({
         user:formdata
      })
   }

   render() {
      return (
         <GuestLayout>
            <form className='signup' onSubmit={this.submitHandler}>
               <input name="username" type="text" onChange={this.formHandler} placeholder="username"/>
               <input name="email" type="text" onChange={this.formHandler} placeholder="email"/>
               <input name="tel" type="text" onChange={this.formHandler} placeholder="tel"/>
               <input name="password" type="text" onChange={this.formHandler} placeholder="password"/>
               <button type='submit'>Sign Up</button>
            </form>
         </GuestLayout>
      )
   }
}
