import Cookies from 'js-cookie';

const HandleCookies = {
  get: function (name) {
    return Cookies.get(name);
  },
  set: function ({ name, value, expires }) {
    Cookies.set(name, value, { expires });
  },
  remove: function (name) {
    Cookies.remove(name);
  },
};

export default HandleCookies;

