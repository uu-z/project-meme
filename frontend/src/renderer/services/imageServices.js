import { request } from "../utils";
import store from "../store";

export default {
  getFiles: () => {
    return request({
      url: "upload/files",
    });
  },
  upload: ()=> {
    return request({
      method: "POST",
      url:"upload"
    })
  }
};
