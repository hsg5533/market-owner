import axios from "axios";
import config from "../json/config.json";

class visitservice {
  getVisitMonth(storecode) {
    return axios({
      url: config.host + "/getVisitMonth",
      method: "post",
      data: {
        storecode: storecode,
      },
    });
  }
}
export default new visitservice();
