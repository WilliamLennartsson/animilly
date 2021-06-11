import axios from 'axios'
import { getCookie, setCookie, deleteCookie } from './cookies'
const API_URL = 'http://localhost:3000/users/'

class AuthService {
  login(user) {
    return axios({
      method: 'post',
      url: API_URL + 'signin',
      headers: { "content-type": "application/json" },
      data: {
        email: user.email,
        password: user.password
      },
    }).then(response => {
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data))
      }

      return response.data
    })
  }

  logout() {
    deleteCookie('authToken')
  }

  // Not implemented yet
  register(user) {
    return axios.post(API_URL + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    })
  }
  
  saveAuthToken(token) {
    // localStorage.setItem("authToken", token);
    setCookie('authToken', token, 30)
  }

  retreiveAuthToken() {
    // return localStorage.getitem("authToken");
    return getCookie('authToken')
  }
}

export default new AuthService()
