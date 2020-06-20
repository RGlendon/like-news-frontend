export default class ApiFetch {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  makeFetch(url, method = 'GET', type = undefined, body = undefined) {
    if (body) {
      body = JSON.stringify(body);
    }
    return fetch(`${this.baseUrl}${url}`, {
      headers: {
        'content-type': type,
      },
      credentials: 'include',
      method,
      body,
    })
      .then((resp) => {
        if (!resp.ok) {
          return resp.json().then(err => Promise.reject(err));
        }
        return resp.json();
      })
  }


  getUserInfo() {
    return this.makeFetch('/users/me');
  }

  signup(email, password, name) {
    return this.makeFetch('/signup', 'POST', 'application/json', {email, password, name});
  }

  signin(email, password) {
    return this.makeFetch('/signin', 'POST', 'application/json', {email, password});
  }

  logout() {
    return this.makeFetch('/users/me', 'DELETE');
  }


  likeArticle({keyword, title, text, date, source, link, image}) {
    return this.makeFetch('/articles', 'POST', 'application/json', {
      keyword, title, text, date, source, link, image
    });

  }

  dislikeArticle(id) {
    return this.makeFetch(`/articles/${id}`, 'DELETE');
  }



  updateUserInfo(name, about) {
    let body = {
      name,
      about,
    };
    return this.makeFetch('/users/me', 'PATCH', 'application/json', body);
  }

  addNewCard(name, link) {
    let body = {
      name,
      link
    }
    return this.makeFetch('/cards', 'POST', 'application/json', body);
  }

  deleteCard(id) {
    return this.makeFetch(`/cards/${id}`, 'DELETE');
  }

  likeCard(id) {
    return this.makeFetch(`/cards/like/${id}`, 'PUT');
  }

  dislikeCard(id) {
    return this.makeFetch(`/cards/like/${id}`, 'DELETE');
  }

  changeAvatar(avatar) {
    let body = {
      avatar,
    };
    return this.makeFetch('/users/me/avatar', 'PATCH', 'application/json', body);
  }
}
