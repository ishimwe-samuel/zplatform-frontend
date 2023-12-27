import axios from "axios";
import SecureLS from "secure-ls";

//
const instance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_API_URL}api/v1`,
  timeout: 1000 * 5, //
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
export default instance;
// axios interceptors
instance.interceptors.request.use(async (config) => {
  let ls = new SecureLS({
    encodingType: "aes",
    encryptionSecret: process.env.REACT_APP_SECRET_KEY,
  });
  if (localStorage.getItem("token")) {
    let token = ls.get("token");
    config.headers["Authorization"] = `JWT ${token}`;
    return config;
  } else {
    return config;
  }
});
