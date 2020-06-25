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
      });
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


  getSavedCards() {
    return this.makeFetch('/articles');
  }
}
