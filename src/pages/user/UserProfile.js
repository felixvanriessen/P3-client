import React, { Component } from 'react'
import {getUser, logout, setUser} from '../../utils/auth'
import UserLayout from '../../layout/UserLayout'
import axios from 'axios'
import {Route, Link, Switch} from 'react-router-dom'
import PostCar from './PostCar'
import qs from 'qs'
import SaleCar from './SaleCar'

export default class UserProfile extends Component {
   state = {
      user:{},
      useredit:{},
      link:'/profile/postcar',
      cars:[],
      style:{
         color:'rgba(180,180,180,0)',
         border:'none',
         backgroundColor:'rgba(0,0,0,0)',
         height:'1px'
      }
   }

   componentDidMount(){
      let userprofile = getUser()
      if (userprofile) {
         axios({
            method:'GET',
            url:`http://localhost:3004/cars/owned/${userprofile._id}`
         })
         .then(response=>{
            this.setState({
               user:{...userprofile},
               useredit:{...userprofile},
               cars:response.data
            })
         })
         .catch(err=>console.log(err))

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
            useredit:response.data,
            style:{
               color:'rgba(180,180,180,0)',
               border:'none',
               backgroundColor:'rgba(0,0,0,0)',
               height:'1px'
            }
         })
      })
   }

   formHandler = (e) => {
      let edit = {...this.state.useredit}
      edit[e.target.name] = e.target.value
      let mystyle = {}
      if (edit.username !== this.state.user.username || edit.email !== this.state.user.email || edit.tel !== this.state.user.tel) {

         mystyle = {
            color:'white',
            border:'2px solid green',
            backgroundColor:'green',
            height:'30px'
         }
      } else {
         mystyle = {
            color:'rgba(180,180,180,0)',
            border:'none',
            backgroundColor:'rgba(0,0,0,0)',
            height:'1px'
         }
      }
      this.setState({
         useredit:edit,
         style:mystyle
      })
   }
   
   reFresh = () => {
      axios({
         method:'GET',
         url:`http://localhost:3004/cars/owned/${this.state.user._id}`
      })
      .then(response=>{
         this.setState({
            cars:response.data
         })
      })
      .catch(err=>console.log(err))
   }

   render() {
      return (
         <UserLayout logOut = {this.logOut}>
         <div className='user-container'>

            <div className="user-info">
               <h2>Hello {this.state.user.username}!</h2>
               <form className='user-edit-form' onSubmit={this.editUser}>
               <p>Username:</p>
               <input type="text" name='username' value={this.state.useredit.username} onChange={this.formHandler}/>
               <p>Email:</p>
               <input type="text" name='email' value={this.state.useredit.email} onChange={this.formHandler}/>
               <p>Telephone:</p>
                  <input type="text" name='tel' value={this.state.useredit.tel} onChange={this.formHandler}/>
                  <button type='submit' style={this.state.style}>Save Changes</button>
               </form>
            </div>

            <div className='postcar-section'>
               <Link to={this.state.link} className='postcar-link' onClick={()=>{
                  if (this.state.link === '/profile/postcar') this.setState({link:'/profile'})
                  else this.setState({link:'/profile/postcar'})
               }}>POST NEW CAR</Link>
               <Route path='/profile/postcar' component={PostCar} />
            </div>

            <div className='cars-for-sale'>
               <h3>Your cars currently for sale:</h3>
               {this.state.cars.map(car=>
                  <SaleCar
                  refresh={this.reFresh}
                  id={car._id}
                  name={car.name}
                  price={car.price}
                  />
                  )}
            </div>
         </div>
         </UserLayout>
      )
   }
}
