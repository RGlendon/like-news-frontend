export const validatePassword = (value) => {
  const regExp = /(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*/;
  return regExp.test(value);
};

export const sanitarize = (string) => {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  const reg = /[&<>"'/]/ig;
  return string.replace(reg, (match) => (map[match]));
};

// const validateId = (value) => {
//   // console.log(mongoose.Types.ObjectId.isValid(value))
//   if (!mongoose.Types.ObjectId.isValid(value)) {
//     throw new Error('некорректный id статьи');
//   }
//   return value;
// };

export const validateUrl = (str) => {
  const regExp = /https?:\/\/(www\.)?(\w+(-\w+)*(\.\w+(-\w+)*)*\.[a-z]{2,}|(\d\d?|1\d\d|2[0-5][0-5])(\.(\d\d?|1\d\d|2[0-5][0-5])){3})(:\d{2,5})?([0-9a-z\/]+)?#?/
  return regExp.test(str);
};
