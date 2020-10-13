import axios from 'axios'

const service = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? '/api'
      : 'http://localhost:5000/api',
  withCredentials: true,
})

const errHandler = err => {
  console.error(err)
  if (err.response && err.response.data) {
    console.error('API response', err.response.data)
    throw err.response.data.message
  }
  throw err
}

export default {
  service: service,

  isDoctor() {
    let user = JSON.parse(localStorage.getItem('user'))
    return user.userAuthorization === "DOCTOR"
  },

  getUser() {
    let user = JSON.parse(localStorage.getItem('user'))
    return user
  },

  isUser() {
    let user = JSON.parse(localStorage.getItem('user'))
    return user.userAuthorization === "USER"
  },

  // This method is synchronous and returns true or false
  // To know if the user is connected, we just check if we have a value for localStorage.getItem('user')
  isLoggedIn() {
    return localStorage.getItem('user') != null
  },

  // This method returns the user from the localStorage
  // Be careful, the value is the one when the user logged in for the last time
  getLocalStorageUser() {
    return JSON.parse(localStorage.getItem('user'))
  },

  // This method signs up and logs in the user
  signup(userInfo) {
    return service
      .post('/signup', userInfo)
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem('user', JSON.stringify(res.data))
        return res.data
      })
      .catch(errHandler)
  },

  login(username, password) {
    return service
      .post('/login', {
        username,
        password,
      })
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem('user', JSON.stringify(res.data))
        return res.data
      })
      .catch(errHandler)
  },

  logout() {
    localStorage.removeItem('user')
    return service.get('/logout')
  },

  findUserByName(name) {
    return service
      .get('/message/findUsername/' + name)
      .then(res => res.data)
      .catch(errHandler)
  },

  findAllChatsNoDoctor() {
    return service
      .get('/message/noChatDoctor')
      .then(res => res.data)
      .catch(errHandler)
  },

  findChatsByDoctor() {
    return service
      .get('/message/chatByDoctor')
      .then(res => res.data)
      .catch(errHandler)
  },

  findChatsByUser() {
    return service
      .get('/message/chatByUser')
      .then(res => res.data)
      .catch(errHandler)
  },

  findMessagesToChat(chatId) {
    return service
      .get('/message/messagesToChat/' + chatId)
      .then(res => res.data)
      .catch(errHandler)
  },

  addNewMessageAndChat(body) {//original newChat and newMessage
    return service
      .post('/message/newChat', body)
      .then(res => res.data)
      .catch(errHandler)
  },

  addNewMessageToChat(chatId, body) {
    return service
      .post('/message/newMessagetoChat/' + chatId, body)
      .then(res => res.data)
      .catch(errHandler)
  },

  addDoctorToChat(chatId) {
    return service
      .post('/message/addDoctorToChat/' + chatId)
      .then(res => res.data)
      .catch(errHandler)
  },
}
