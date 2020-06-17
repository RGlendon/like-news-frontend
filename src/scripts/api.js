const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://localhost:3000/v1',
  // withCredentials: true,
});

export const usersAPI = {
  getUsers(currentPage, pageSize) {
    return instance.get(`/users?page=${currentPage}&count=${pageSize}`);
  },

  unfollow(userId) {
    return instance.delete(`/follow/${userId}`);
  },

  follow(userId) {
    return instance.post(`/follow/${userId}`);
  },

  getProfile(userId) {
    console.warn('Absolete method, please use profileAPI.getProfile');
    return profileAPI.getProfile(userId);
  }
};

export const profileAPI = {
  getProfile(userId) {
    return instance.get(`/profile/` + userId);
  },
  getStatus(userId) {
    return instance.get(`/profile/status/${userId}`)
  },
  updateStatus(status) {
    return instance.put('/profile/status', {status: status})
  }
}

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
  // logout() {
  //   return instance.delete(`/auth/login`);
  // }
};
