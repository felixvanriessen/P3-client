import React, { Component } from 'react'
import Axios from 'axios'
import GuestLayout from '../../layout/GuestLayout'
import qs from 'qs'

export default class CarInfo extends Component {
   state = {
      car:{
         owner:{} //owner of car on the page
      },
      style:{ //style for message-container
         visibility:'collapse',
         height:'0px'
      },
      open:false, //message-container status
      msgobject:{ //message object
         msg_to:'',
         msg:''
      },
      btntext:'Send' //message button text
   }

   //get details for car
   componentDidMount(){
      Axios.get(`${process.env.REACT_APP_API}/cars/find/${this.props.match.params.id}`)
      .then(carfound=>{
         this.setState({
            car:carfound.data
         })
      })
   }

   //open message section using css
   openmsg = () => {
      if (!this.state.open) {
         this.setState({
            style: {
               visibility:'visible',
               height:'100vh',
               bottom:'0px'
            },
            open:true,
            btntext:'Send'
         })
      } else {
         this.setState({
            style: {
               visibility:'collapse',
               height:'0px',
               bottom:'0px'
            },
            open:false
         })
      }
   }

   //update state.msgobject with input values
   msgHandler = (e) => {
      this.setState({
         msgobject:{
            msg_to:this.state.car.owner._id,
            msg:e.target.value
         }
      })
   }
   
   //send message
   sendMsg = () => {
      Axios({
         method:'POST',
         url:`${process.env.REACT_APP_API}/msg/new`,
         withCredentials:true,
         headers: {
            "content-type":"application/x-www-form-urlencoded"
         },
         data: qs.stringify(this.state.msgobject)
      })
      .then(response=>{
         this.setState({btntext:'Message Sent!'})
      })
      .catch(err=>console.log(err))
   }


   render() {
      return (
         <GuestLayout>
            <div className='car-info-container'>
               <div className="car-info">
                  <h2>{this.state.car.name}</h2>
                  <img src={this.state.car.image} alt=""/>
                  <div className='car-info-b'>
                     <p>Price: € <span>{this.state.car.price}</span></p>
                     <p>Year: <span>{this.state.car.year}</span></p>
                  </div>
               </div>
               <div className='car-owner-info'>
                  <h4>{this.state.car.owner.username}</h4>
                  <div className='car-owner-info-b'>
                     <p>{this.state.car.owner.email}</p>
                     <p>{this.state.car.owner.tel}</p>
                  </div>
                  <p className='owner-msg-btn' onClick={this.openmsg}>Leave a message</p>
               </div>
               <div className='msg-container' style={this.state.style}>
                  <p onClick={()=>{
                     this.setState({
                        style: {
                           visibility:'collapse',
                           height:'0px',
                           bottom:'0px'
                        },
                        open:false
                     })
                  }} className='msg-close-btn'>close</p>
                  <div className='owner-msg'>
                     <h3>Leave a message for {this.state.car.owner.username}</h3>
                     <textarea name="" cols="40" rows="10" onChange={this.msgHandler} placeholder="You are sending this message anonymously, don't forget to leave behind some contact detials."></textarea>
                     <button onClick={this.sendMsg}>{this.state.btntext}</button>
                  </div>
               </div>
            </div>
         </GuestLayout>
      )
   }
}

