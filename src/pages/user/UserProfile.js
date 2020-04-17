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
      user:{}, //user 
      useredit:{}, //user while editing
      link:'/profile/postcar', //dynamic url
      cars:[], //owned cars
      style:{ //style for user editing 'save changes' button
         color:'rgba(180,180,180,0)',
         border:'none',
         backgroundColor:'rgba(0,0,0,0)',
         height:'1px'
      },
      popup:false, //post car section status
      style2:{ //style for post car section
         width:'100%',
         position: 'relative',
         bottom:'0',
         height: '50px',
         backgroundColor: 'rgba(228, 242, 255, 0.1)'
      },
      arrow:'▼', //arrow symbol for post car button
      style4:{ //style for screen background darkening
         zIndex:'-1',
         height:'100vh',
         backgroundColor:"rgba(255, 255, 255, 0.01)"
      },
      msgs:[], //messages for user
      style5:{ //style for messages section
         height:'0px',
         overflow:'hidden'
      },
      msgsopen:false, //messages section status
      msgsarrow:'▼' //arrow symbol for messages button
   }

   //get owned cars and messages for user if user is logged in, else redirect landingpage
   componentDidMount(){
      let userprofile = getUser()
      if (userprofile) {
         axios({
            method:'GET',
            url:`${process.env.REACT_APP_API}/cars/owned/${userprofile._id}`
         })
         .then(response=>{
            axios({
               method:'GET',
               url:`${process.env.REACT_APP_API}/msg/get/${userprofile._id}`
            })
            .then(response2=>{
               let messages = response2.data.reverse()
               this.setState({
                  user:{...userprofile},
                  useredit:{...userprofile},
                  cars:response.data,
                  msgs:messages
               })
            })
            .catch(err=>console.log(err))
         })
         .catch(err=>console.log(err))

      } else {
         this.props.history.push('/')
      }
   }

   //logout in api and client
   logOut = () => {
      axios.get(`${process.env.REACT_APP_API}/auth/logout`)
      .then(response=>{
         logout()
         this.props.history.push('/')
      })
      .catch(err=>console.log(err))
   }

   //submit edit for user details
   editUser = (e) => {
      e.preventDefault()
      axios.post(`${process.env.REACT_APP_API}/user/edit`, this.state.useredit, {withCredentials: true})
      .then(response=>{
         let updatedUser = response.data
         console.log(updatedUser)
         setUser(updatedUser)
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

   //update state.useredit with input values
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
   
   //refresh list of owned cars (used after deletion of cars)
   reFresh = () => {
      axios({
         method:'GET',
         url:`${process.env.REACT_APP_API}/cars/owned/${this.state.user._id}`
      })
      .then(response=>{
         this.setState({
            cars:response.data
         })
      })
      .catch(err=>console.log(err))
   }

   //show post car form using CSS
   postCarPopUp = () => {
      if (this.state.popup) {
         this.setState({
            popup:false,
            style2:{
               width:'100%',
               position: 'relative',
               bottom:'0',
               height: '50px',
               backgroundColor: 'rgba(228, 242, 255, 0.1)'
            },
            style4:{
               zIndex:'-1',
               height:'100vh',
               backgroundColor:"rgba(255, 255, 255, 0.01)"
            }
         })
      } else {
         this.setState({
            popup:true,
            style2:{
               width:'100%',
               position: 'relative',
               top:'0px',
               height: '400px',
               backgroundColor: 'rgba(157, 206, 255)'
            },
            style4:{
               zIndex:'1',
               height:'100vh',
               backgroundColor:"rgba(0, 0, 0, 0.8)"
            }
         })
      }
   }

   //show messages section using CSS
   openMsgs = () => {
      if (!this.state.msgsopen){
         this.setState({
            style5:{
               height:'50vh',
               overflow:'scroll'
            },
            msgsopen:true,
            msgsarrow:'▲'
         })
      } else {
         this.setState({
            style5:{
               height:'0px',
               overflow:'hidden'
            },
            msgsopen:false,
            msgsarrow:'▼'
         })
      }
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
            <div className='screen-cover' style={this.state.style4}></div>
            <div className='postcar-section' style={this.state.style2}>
               <Link to={this.state.link} className='postcar-link' onClick={()=>{
                  if (this.state.link === '/profile/postcar') this.setState({link:'/profile', arrow:'▲'})
                  else this.setState({link:'/profile/postcar', arrow:'▼'})
                  this.postCarPopUp()

               }}>{'POST NEW CAR ' + this.state.arrow}</Link>
               <Route path='/profile/postcar' component={PostCar} />
            </div>
            <div className='msgs-container'>
               <h4 onClick={this.openMsgs}> {this.state.msgs.length} Messages {this.state.msgsarrow}</h4>
               <div className='msgs' style={this.state.style5}>
                  {this.state.msgs.map(msg=>(
                     <div className='msg'>
                     <p>{msg.msg}</p>
                     </div>
                     ))}
               </div>
            </div>

            <div className='cars-for-sale'>
               <h3>Your cars currently for sale:</h3>
               <div className='salecar-list'>
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
         </div>
         </UserLayout>
      )
   }
}
