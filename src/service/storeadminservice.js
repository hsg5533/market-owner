import axios from "axios";
import config from "../json/config.json";

class storeadminservice {
  login(regnumber, password) {
    return axios({
      url: config.host + "/storeLogin",
      method: "post",
      data: {
        regnumber: regnumber,
        password: password,
      },
    });
  }

  changePassword(password) {
    return axios({
      url: config.host + "/changePassword",
      method: "post",
      data: {
        password: password,
        regnumber: `${sessionStorage.getItem("regnumber")}`,
      },
    });
  }

  resetPassword(name, owner, phone) {
    return axios({
      url: config.host + "/resetPassword",
      method: "post",
      data: {
        name: name,
        owner: owner,
        phone: phone,
      },
    });
  }
}
export default new storeadminservice();
