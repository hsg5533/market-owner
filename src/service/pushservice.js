import axios from "axios";
import config from "../json/config.json";

class pushservice {
  tokenRegist(user, token) {
    return axios({
      url: config.host + "/tokenRegist",
      method: "post",
      data: {
        user: user,
        token: token,
      },
    });
  }
}
export default new pushservice();
