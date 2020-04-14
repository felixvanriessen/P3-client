import React, { Component } from 'react'
import GuestLayout from '../../layout/GuestLayout'
import {signup} from '../../utils/auth'
import Axios from 'axios'


export default class Signup extends Component {

   state = {
      user:{},
      usernamecheck:'Sign Up',
      userlist:[],
      style:{
         border:'2px solid dodgerblue'
      },
      style2: {
         border:'2px solid #9DCEFF'
      },
      style3:{
         fontSize:'2rem'
      }
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
            usernamecheck:'Username already exists',
            style2:{border:'2px solid red'},
            style3:{fontSize:'1.4rem', color:'red'}
         })
      } else {
         this.setState({
            usernamecheck:'Sign Up',
            style2:{border:'2px solid rgb(209,209,209)'},
            style3:{fontSize:'2rem', color:'dodgerblue'}
         })

      }

      
   }

   submitHandler = (e) => {
      e.preventDefault()
      signup(this.state.user)
      .then((response)=>{
         this.setState({
            usernamecheck:'Welcome!',
            style:{border:'2px solid #36a832', boxShadow:'0px 4px 10px #36a832'},
            style3:{fontSize:'1.8rem', color:'green'}
         })
         setTimeout(()=>{
            this.props.history.push('/profile')
         }, 1000)
      })
      .catch(err=>console.log(err))
   }

   render() {
      return (
         <GuestLayout>
         <div className='auth-container'>
            <h3 style={this.state.style3}>{this.state.usernamecheck}</h3>
            <form className='signup-form auth-form' onSubmit={this.submitHandler}>
               <input style={this.state.style2} name="username" type="text" onChange={this.formHandler} placeholder="username" required pattern='^[a-z0-9A-Z ]{3,20}$' title='Username must be 3 to 20 characters long. Use alphabetic or numerical characters only.'/>
               <input name="email" type="text" onChange={this.formHandler} placeholder="email" />
               <input name="tel" type="text" onChange={this.formHandler} placeholder="telephone" required pattern='^[0-9 -+]{6-14}$' title='Telephone must be 6 to 14 numbers long. Use numbers only.'/>
               <input name="password" type="password" onChange={this.formHandler} placeholder="password" required pattern='^.{8,16}$' title='Password must be 8 to 16 characters long.'/>
               <button type='submit' style={this.state.style}>Sign Up</button>
            </form>
         </div>
         </GuestLayout>
      )
   }
}
