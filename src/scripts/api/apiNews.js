export default class ApiNews {
  constructor() {
    // this.baseUrl = 'https://newsapi.org/v2/everything?';
    this.baseUrl = 'https://praktikum.tk/news/v2/everything?';
    this.apiKey = '200bdc0bda904a5caec25b52d70a903c';
    this.howOld = 7;
    this.pageSize = 100;
  }

  makeFetch(url, method = 'GET') {
    return fetch(url, {
      method,
    })
      .then((resp) => {
        if (!resp.ok) {
          return resp.json().then(err => Promise.reject(err));
        }
        return resp.json();
      })
  }

  convertDateToStr(date) {
    const year = date.getFullYear();
    const month =  `${date.getMonth() + 1}`;
    const day = '0' + date.getDate();

    return  year + '-' + month + '-' + day.substr(-2);
  }

  getNews(keyWord) {
    const oldDate = new Date();
    oldDate.setDate(oldDate.getDate() - this.howOld);

    let url = this.baseUrl +
      `q=${keyWord}&` +
      `from=${this.convertDateToStr(oldDate)}&` +
      `to=${this.convertDateToStr(new Date)}&` +
      'sortBy=popularity&' +
      `pageSize=${this.pageSize}&` +
      `apiKey=${this.apiKey}`;

    return this.makeFetch(url);
  }

  // запрос: то, что ввёл пользователь в поиск;
  // apiKey: ключ, который вы получите после регистрации;
  // from: 7 дней назад от текущей даты;
  // to: текущая дата;
  // pageSize: максимально допустимый массив. Выберите 100 статей — это ограничение бесплатной версии.
}
