// название издания находится в свойстве source.name;
// заголовок — в title,
// дата публикации — в publishedAt;
// подзаголовок — в description;
// изображение — urlToImage.

const initialCards = [
  {
    urlToImage: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    publishedAt: '1 августа, 2019',
    title: 'Национальное достояние – парки',
    description: `В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система 
    национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе.`,
    'source.name': 'Лента.ру',
  },
  {
    urlToImage: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    publishedAt: '2 августа, 2019',
    title: 'Лесные огоньки: история одной фотографии',
    description: `Фотограф отвлеклась от освещения суровой политической реальности Мексики, чтобы 
    запечатлеть ускользающую красоту одного из местных чудес природы.`,
    'source.name': 'Медуза',
  },
  {
    urlToImage: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    publishedAt: '23 августа, 2019',
    title: '«Первозданнаяваываыва тайга»: новый фотопроект Игоря Шпиленка',
    description: `Знаменитый фотограф снимает первозданные леса России, чтобы рассказать о необходимости их сохранения. 
    В этот раз он отправился в Двинско-Пинежскую тайгу, где Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
    Iste, nihil!`,
    'source.name': 'Медуза',
  },
  {
    urlToImage: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    publishedAt: '2 августа, 2019',
    title: 'Национальное достояние – парки',
    description: `В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система 
    национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе.`,
    'source.name': 'Лента.ру',
  },
  {
    urlToImage: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    publishedAt: '2 августа, 2019',
    title: 'Лесные огоньки: история одной фотографии',
    description: `Фотограф отвлеклась от освещения суровой политической реальности Мексики, чтобы 
    запечатлеть ускользающую красоту одного из местных чудес природы.`,
    'source.name': 'Медуза',
  },
  {
    urlToImage: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    publishedAt: '2 августа, 2019',
    title: '«Первозданная тайга»: новый фотопроект Игоря Шпиленка',
    description: `Знаменитый фотограф снимает первозданные леса России, чтобы рассказать о необходимости их сохранения.
    В этот раз он отправился в Двинско-Пинежскую тайгу, где Lorem ipsum dolor sit amet, consectetur adipisicing elit.
    Iste, nihil!`,
    'source.name': 'Медуза',
  },
  {
    urlToImage: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    publishedAt: '2 августа, 2019',
    title: '«Первозданная тайга»: новый фотопроект Игоря Шпиленка',
    description: `Знаменитый фотограф снимает первозданные леса России, чтобы рассказать о необходимости их сохранения.
    В этот раз он отправился в Двинско-Пинежскую тайгу, где Lorem ipsum dolor sit amet, consectetur adipisicing elit.
    Iste, nihil!`,
    'source.name': 'Медуза',
  },
  {
    urlToImage: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    publishedAt: '2 августа, 2019',
    title: '«Первозданная тайга»: новый фотопроект Игоря Шпиленка',
    description: `Знаменитый фотограф снимает первозданные леса России, чтобы рассказать о необходимости их сохранения.
    В этот раз он отправился в Двинско-Пинежскую тайгу, где Lorem ipsum dolor sit amet, consectetur adipisicing elit.
    Iste, nihil!`,
    'source.name': 'Медуза',
  },
];

export default initialCards;
