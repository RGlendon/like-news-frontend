import {store} from "./commonReduser";

export default class SavedBlock {
  constructor(container) {
    this.container = container;
  }

  setName(name) {
    const nameField = this.container.querySelector('.saved__name');
    nameField.textContent = name;
  }

  setCountArticles(savedArticles) {
    const countField = this.container.querySelector('.saved__count-articles');
    const allCount = savedArticles.length.toString();
    const lastNumber = allCount.match(/\d*(\d)$/)[1];
    const lastTwoNumber = allCount.match(/\d*(\d\d)$/) ? allCount.match(/\d*(\d\d)$/)[1] : null;

    countField.textContent = `${allCount} ${
      +lastTwoNumber === 11 
        ? 'сохраненных статей' 
        : +lastNumber === 1
          ? 'сохраненная статья'
          : +lastNumber >= 2 && +lastNumber <= 4 
            ? 'сохраненных статьи'
            : 'сохраненных статей'}`;
  }

  setKeywords(savedArticles) {
    const keywordsField = this.container.querySelector('.saved__keywords-container');
    // debugger
    const countedObj = savedArticles.reduce((obj, item) => {
      obj[item.keyword] = (obj[item.keyword] === undefined) ? 1 : ++obj[item.keyword];
      return obj;
    }, {});
    const sortedArr = Object.entries(countedObj).sort((a, b) => b[1] - a[1]);
    // console.log(savedArticles)
    // console.log(sortedArr)
    keywordsField.insertAdjacentHTML('afterbegin',
      `${sortedArr.length === 0 ? `` : ''}
       ${sortedArr.length === 1 
        ? `<span class="saved__keywords-content">${sortedArr[0][0]}</span>` 
        : ''}   
       ${sortedArr.length === 2 
        ? `<span class="saved__keywords-content">${sortedArr[0][0]}</span> и <span class="saved__keywords-content">${sortedArr[1][0]}</span>` 
        : ''}   
       ${sortedArr.length === 3 
        ? `<span class="saved__keywords-content">${sortedArr[0][0]}, ${sortedArr[1][0]}</span> и <span class="saved__keywords-content">${sortedArr[2][0]}</span>` 
        : ''}   
       ${sortedArr.length > 3 
        ? `<span class="saved__keywords-content">${sortedArr[0][0]}, ${sortedArr[1][0]}</span> и <span class="saved__keywords-content">${sortedArr.length - 2} другим</span>` 
        : ''}`
    );
  }
}
