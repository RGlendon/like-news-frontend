// название издания находится в свойстве source.name;
// заголовок — в title,
// дата публикации — в publishedAt;
// подзаголовок — в description;
// изображение — urlToImage.

const initialCards = [
  {
    _id: 1,
    urlToImage: '',
    publishedAt: '<b>Жирный</b>',
    title: '«Первозданнаяваываываsdfsdf тайга»: новый фотопроект Игоря Шпиленка',
    description: `В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система 
    национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе.`,
    source: {name: 'Лента.ру'},
  },
  {
    _id: 2,
    urlToImage: 'https://avatars.mds.yandex.net/get-zen_doc/1900370/pub_5de43ccb8f011100ae5a1d8b_5de43cf0f73d9d00ae14b94c/scale_1200',
    publishedAt: '2020-06-12T19:04:17Z',
    title: 'Лесные огоньки: история одной фотографии',
    description: `Фотограф отвлеклась от освещения суровой политической реальности Мексики, чтобы 
    запечатлеть ускользающую красоту одного из местных чудес природы.`,
    source: {name: 'Медуза'},
  },
  {
    _id: 3,
    urlToImage: 'https://avatars.mds.yandex.net/get-pdb/25978/f398fbad-a3ff-41b4-97dd-746d22a8230c/s1200?webp=false',
    publishedAt: '2020-06-14T16:14:45Z',
    title: '«Первозданнаяваываыва тайга»: новый фотопроект Игоря Шпиленка',
    description: `Знаменитый фотограф снимает первозданные леса России, чтобы рассказать о необходимости их сохранения. 
    В этот раз он отправился в Двинско-Пинежскую тайгу, где Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
    Iste, nihil!`,
    source: {name: 'Медуза'},
  },
  {
    _id: 4,
    urlToImage: 'https://img3.akspic.com/image/73461-city-road-metropolis-town-philadelphia-2880x1800.jpg',
    publishedAt: '2 августа, 2019',
    title: 'Национальное достояние – парки',
    description: `В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система 
    национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе.`,
    source: {name: 'Лента.ру'},
  },
  {
    _id: 5,
    urlToImage: 'https://avatars.mds.yandex.net/get-pdb/25978/f398fbad-a3ff-41b4-97dd-746d22a8230c/s1200?webp=false',
    publishedAt: '2 августа, 2019',
    title: 'Лесные огоньки: история одной фотографии',
    description: `Фотограф отвлеклась от освещения суровой политической реальности Мексики, чтобы 
    запечатлеть ускользающую красоту одного из местных чудес природы.`,
    source: {name: 'Медуза'},
  },
  {
    _id: 6,
    urlToImage: 'https://yandex.ru/images/_crpd/qGi5mS190/090b46s87iBR/NfNCHT-Rw5UkJ9WsChXoBqj3tV1Ry8CuJyvHCIJm82wgdUz0dS12ZF7n_ewx-P6hi3YeHBG8EGUBmUfeza5VUSQWY13KRVKQRLIQU',
    publishedAt: '2 августа, 2019',
    title: '«Первозданная тайга»: новый фотопроект Игоря Шпиленка',
    description: `Знаменитый фотограф снимает первозданные леса России, чтобы рассказать о необходимости их сохранения.
    В этот раз он отправился в Двинско-Пинежскую тайгу, где Lorem ipsum dolor sit amet, consectetur adipisicing elit.
    Iste, nihil!`,
    source: {name: 'Медуза'},
  },
  {
    _id: 7,
    urlToImage: 'http://www.fonstola.ru/download.php?file=201111/2560x1600/fonstola.ru-49813.jpg',
    publishedAt: '2 августа, 2019',
    title: '«Первозданная тайга»: новый фотопроект Игоря Шпиленка',
    description: `Знаменитый фотограф снимает первозданные леса России, чтобы рассказать о необходимости их сохранения.
    В этот раз он отправился в Двинско-Пинежскую тайгу, где Lorem ipsum dolor sit amet, consectetur adipisicing elit.
    Iste, nihil!`,
    source: {name: 'Медуза'},
  },
  {
    _id: 8,
    urlToImage: 'https://im0-tub-ru.yandex.net/i?id=0b954093d57ba705d3c35ac78e9eb158&ref=rim&n=33&w=250&h=188',
    publishedAt: '2 августа, 2019',
    title: '«Первозданная тайга»: новый фотопроект Игоря Шпиленка',
    description: `Знаменитый фотограф снимает первозданные леса России, чтобы рассказать о необходимости их сохранения.
    В этот раз он отправился в Двинско-Пинежскую тайгу, где Lorem ipsum dolor sit amet, consectetur adipisicing elit.
    Iste, nihil!`,
    source: {name: 'Медуза'},
  },
];

export default initialCards;
