import React, { Component } from 'react'
import GuestLayout from '../../layout/GuestLayout'
import {signup} from '../../utils/auth'
import Axios from 'axios'


export default class Signup extends Component {

   state = {
      user:{},
      usernamecheck:'',
      userlist:[]
   }

   componentDidMount(){
      Axios.get('http://localhost:3004/auth/userlist')
      .then(response=>{
         this.setState({
            userlist:response.data
         })
      })
      .catch(err=>console.log(err))
   }
   
   formHandler = (e) => {
      let formdata = {...this.state.user}
      formdata[e.target.name] = e.target.value
      this.setState({
         user:formdata
      })

      let count = 0
      if (e.target.name === 'username'){
         this.state.userlist.forEach(el => {
            if (e.target.value === el.username) count++
         })
      }

      if (count > 0) {
         this.setState({
            usernamecheck:'This username already exists'
         })
      } else {
         this.setState({
            usernamecheck:''
         })

      }

      
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
               <p>{this.state.usernamecheck}</p>
               <p>{this.state.user.username}</p>
               <input name="username" type="text" onChange={this.formHandler} placeholder="username" required pattern='^[a-z0-9 ]{3,20}$' title='Username must be 3 to 20 characters long. Use alphabetic or numerical characters only.'/>
               <input name="email" type="text" onChange={this.formHandler} placeholder="email" />
               <input name="tel" type="text" onChange={this.formHandler} placeholder="tel" required pattern='^[0-9 -+]{6-14}$' title='Telephone must be 6 to 14 numbers long. Use numbers only.'/>
               <input name="password" type="password" onChange={this.formHandler} placeholder="password" required pattern='^.{8,16}$' title='Password must be 8 to 16 characters long.'/>
               <button type='submit'>Sign Up</button>
            </form>
         </GuestLayout>
      )
   }
}
