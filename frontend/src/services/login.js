import axios from "axios";
const baseUrl = "/api/login";

const login = (username, password) => {
  return axios
    .post(baseUrl, { username, password })
    .then((response) => response.data)
    .then((user) => {
      localStorage.setItem("user", JSON.stringify(user));
      setToken(user.token);
      return user;
    })
    .catch((error) => {
      throw new Error(error.response.data.error);
    });
};

const logout = () => {
  localStorage.removeItem("user");
  setToken("");
};

const setToken = (token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const loginService = { login, logout, setToken };

export default loginService;
