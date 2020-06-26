// const axios = require('axios');
//
// const instance = axios.create({
//   baseURL: 'http://localhost:3000/v1',
//   withCredentials: true,
// });


export const authAPI = {
  me() {
    return instance.get('/users/me');
  },
  signup(email, password, name) {
    return instance.post('/signup', {email, password, name});
  },
  signin(email, password) {
    return instance.post('/signin', {email, password});
  },
};
