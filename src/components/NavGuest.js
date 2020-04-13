import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import { getUser } from '../utils/auth'

export default class NavGuest extends Component {
   state = {
      auth:false
   }
   componentDidMount(){
      let user = getUser()
      console.log(user)
      if (user) this.setState({auth:true})
      else this.setState({auth:false})
   }

   dynamicNav = () => {
      if (this.state.auth){
         return (
            <Link className='nav-link' to='profile'>
            <h3>YOUR NAME</h3>
            </Link>
         )
      } else {
         return (
            <div style={{display:'flex', justifyContent:'space-evenly', alignItems:'center', width:'50%', height:'100%'}}>
            <Link className='nav-link' to='/signup'>
            <h3>Sign Up</h3>
            </Link>

            <Link className='nav-link' to='/login'>
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

// <Link className='nav-link' to='/signup'>
// <h3>Sign Up</h3>
// </Link>

// <Link className='nav-link' to='/login'>
// <h3>Log In</h3>
// </Link>