const validatePhone = (phone) => /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/.test(phone);
const validateEmail = (email) =>
  /^[a-z0-9_\.-]+\@[a-z0-9\-]+\.[a-z]+$/.test(email.toLowerCase());
const validateUserName = (username) => /^[a-zA-Z0-9_-]{6,16}$/.test(username);

module.export = { validatePhone, validateEmail, validateUserName };