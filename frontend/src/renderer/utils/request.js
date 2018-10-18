import axios from "axios";
import _ from "lodash";
import store from "../store";


axios.interceptors.request.use(config => {
  return config;
})

axios.interceptors.response.use(
  res => {
    return res.data;
  },
  err => {
    return Promise.reject(error);
  }
);


export default data =>
  axios({
    method: "GET",
    baseURL: store.state.apiRoot,
    ...data
  });
