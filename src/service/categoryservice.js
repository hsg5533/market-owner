import axios from "axios";
import config from "../json/config.json";

class categoryservice {
  getCategoryDetail(category_code) {
    return axios({
      url: config.host + "/getCategoryDetail",
      method: "post",
      data: {
        category_code: category_code,
      },
    });
  }
}
export default new categoryservice();
