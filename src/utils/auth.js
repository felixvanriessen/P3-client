import Axios from 'axios'
import qs from 'qs'

const axiosauth = Axios.create({
   baseURL:`${process.env.REACT_APP_API}/auth/`,
   withCredentials: true,
   headers:{
      "content-type":"application/x-www-form-urlencoded"
   }
})

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

export const setUser = (user) => {
   window.localStorage.setItem('user', JSON.stringify(user))
}

export const getUser = () => {
   return JSON.parse(window.localStorage.getItem('user'))
}

export const logout = () => {
   window.localStorage.removeItem('user')
}