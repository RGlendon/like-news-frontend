export const validatePassword = (value) => {
  const regExp = /(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*/;
  return regExp.test(value);
};

export const validateUrl = (str) => {
  const regExp = /https?:\/\/(www\.)?(\w+(-\w+)*(\.\w+(-\w+)*)*\.[a-z]{2,}|(\d\d?|1\d\d|2[0-5][0-5])(\.(\d\d?|1\d\d|2[0-5][0-5])){3})(:\d{2,5})?([0-9a-z\/]+)?#?/
  return regExp.test(str);
};

export const sanitize = (string) => {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  const reg = /[&<>"'/]/ig;
  return string ? string.replace(reg, (match) => (map[match])) : '';
};
