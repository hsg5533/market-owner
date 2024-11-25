import axios from "axios";
import config from "../json/config.json";

class inquiryservice {
  getInquiry() {
    return axios.get(config.host + "/getInquiry");
  }

  getInquiryDetail(num) {
    return axios({
      url: config.host + "/getInquiryDetail",
      method: "post",
      data: {
        num: num,
      },
    });
  }

  getInquiryReply(num) {
    return axios({
      url: config.host + "/getInquiryReply",
      method: "post",
      data: {
        num: num,
      },
    });
  }

  deleteInquiry(num) {
    return axios({
      url: config.host + "/deleteInquiry",
      method: "delete",
      data: {
        num: num,
      },
    });
  }
}
export default new inquiryservice();
