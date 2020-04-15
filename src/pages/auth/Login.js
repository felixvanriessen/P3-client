import React, { Component } from 'react'
import GuestLayout from '../../layout/GuestLayout'
import {login} from '../../utils/auth'


export default class Login extends Component {
   state = {
      user:{},
      loginstatus:'',
      style:{}
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
            this.setState({style:{backgroundColor:'#36a832', boxShadow:'0px 4px 10px #36a832'}})
            setTimeout(()=>{
               this.props.history.push('/profile')
            }, 500)
         } else if (msg === 'Invalid credentials') {
            this.setState({
               loginstatus:'Invalid credentials',
               style:{border:'2px solid red'}
            })
         } else {
            this.setState({
               loginstatus:'User does not exist',
               style:{border:'2px solid red'}
            })
         }
         

      })
      .catch(err=>console.log(err))
   }

   render() {
      return (
         <GuestLayout>
         <div className='auth-container'>
            <h3>Log In</h3>
            <form className='login-form auth-form' onSubmit={this.submitHandler}>
               <input type="text" name='username' required onChange={this.formHandler} placeholder='username'/>
               <input type="password" name='password' required onChange={this.formHandler} placeholder='password'/>
               <button type='submit' style={this.state.style}>Log In</button>
            </form>
            <p>{this.state.loginstatus}</p>
         </div>
         </GuestLayout>
      )
   }
}
