import React, { Component } from 'react'
import {getUser, logout, setUser} from '../../utils/auth'
import UserLayout from '../../layout/UserLayout'
import axios from 'axios'


export default class UserProfile extends Component {
   state = {
      user:{},
      useredit:{}
   }
   componentDidMount(){
      let userprofile = getUser()
      if (userprofile) {
         this.setState({
            user:{...userprofile},
            useredit:{...userprofile}
         })
      } else {
         this.props.history.push('/')
      }
   }

   logOut = () => {
      axios.get('http://localhost:3004/auth/logout')
      .then(response=>{
         logout()
         this.props.history.push('/')
      })
      .catch(err=>console.log(err))
   }

   editUser = (e) => {
      e.preventDefault()
      axios.post('http://localhost:3004/user/edit', this.state.useredit, {withCredentials: true})
      .then(response=>{
         setUser(response.data)
         this.setState({
            user:response.data,
            useredit:response.data
         })
      })
   }

   formHandler = (e) => {
      let edit = {...this.state.useredit}
      edit[e.target.name] = e.target.value
      this.setState({
         useredit:edit
      })
   }

   render() {
      return (
         <UserLayout logOut = {this.logOut}>
            <h2>Welcome to your profile page, {this.state.user.username}</h2>
            <form className='user-edit-form' onSubmit={this.editUser} >
               <input type="text" name='username' value={this.state.useredit.username} onChange={this.formHandler}/>
               <input type="text" name='email' value={this.state.useredit.email} onChange={this.formHandler}/>
               <input type="text" name='tel' value={this.state.useredit.tel} onChange={this.formHandler}/>
               <button type='submit'>Save Changes</button>
            </form>
            <h3>{this.state.useredit.email}</h3>
            <h3>{this.state.useredit.tel}</h3>
         </UserLayout>
      )
   }
}
