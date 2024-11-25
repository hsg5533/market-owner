import axios from "axios";
import config from "../json/config.json";

class noticeservice {
  getNotice() {
    return axios.get(config.host + "/getNotice");
  }

  getNoticeDetail(num) {
    return axios({
      url: config.host + "/getNoticeDetail",
      method: "post",
      data: {
        num: num,
      },
    });
  }
}
export default new noticeservice();
