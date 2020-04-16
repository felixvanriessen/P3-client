import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import { getUser } from '../utils/auth'

export default class NavGuest extends Component {
   state = {
      auth:false,
      username:''
   }
   componentDidMount(){
      let user = getUser()
      if (user) this.setState({auth:true, username:user.username})
      else this.setState({auth:false})
   }

   dynamicNav = () => {
      if (this.state.auth){
         return (
            <Link className='nav-link' to='/profile'>
            <h3>{this.state.username}</h3>
            </Link>
         )
      } else {
         return (
            <div className='nav-auth'>
            <Link className='nav-link-b' to='/signup'>
            <h3>Sign Up</h3>
            </Link>

            <Link className='nav-link-b' to='/login'>
            <h3>Log In</h3>
            </Link>
            </div>
         )
      }
   }
   render(){
      return (
         <div className='nav-guest nav'>
            <Link className='nav-link' to='/'>
               <h3>Home</h3>
            </Link>
         {this.dynamicNav()}

         </div>
      )
   }
}
