import Axios from 'axios'
import qs from 'qs'

//default axios call
const axiosauth = Axios.create({
   baseURL:`${process.env.REACT_APP_API}/auth/`,
   withCredentials: true,
   headers:{
      "content-type":"application/x-www-form-urlencoded"
   }
})

//login and setUser
export const login = (user) => {
   return axiosauth({
      method:'POST',
      url:'login',
      data:qs.stringify(user)
   })
   .then(response=> {
      if (response.data.user){
         setUser(response.data.user)
      }
      return response
   })
}

//signup and setUser
export const signup = (user) => {
   return axiosauth({
      method:'POST',
      url:'signup',
      data:qs.stringify(user)
   })
   .then(response=>{
      setUser(response.data)
   })
}

//set User to localStorage
export const setUser = (user) => {
   window.localStorage.setItem('user', JSON.stringify(user))
}
//get User from localStorage
export const getUser = () => {
   return JSON.parse(window.localStorage.getItem('user'))
}

//remove User from localStorage
export const logout = () => {
   window.localStorage.removeItem('user')
}