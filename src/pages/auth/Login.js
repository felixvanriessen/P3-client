import React, { Component } from 'react'
import GuestLayout from '../../layout/GuestLayout'
import {login} from '../../utils/auth'


export default class Login extends Component {
   state = {
      user:{},
      loginstatus:''
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
      login(this.state.user)
      .then((response)=>{
         console.log(response.data.message)
         let msg = response.data.message
         if (msg === 'Logged in'){
            this.props.history.push('/profile')
         } else if (msg === 'Invalid credentials') {
            this.setState({
               loginstatus:'Invalid credentials'
            })
         } else {
            this.setState({
               loginstatus:'User does not exist'
            })
         }
         

      })
      .catch(err=>console.log(err))
   }

   render() {
      return (
         <GuestLayout>
            <h1>Log-in Page</h1>
            <form className='login-form' onSubmit={this.submitHandler}>
               <input type="text" name='username' required onChange={this.formHandler} />
               <input type="password" name='password' required onChange={this.formHandler} />
               <button type='submit'>Log In</button>
            </form>
            <h3>{this.state.loginstatus}</h3>
         </GuestLayout>
      )
   }
}
