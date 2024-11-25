import axios from "axios";
import config from "../json/config.json";

class storeservice {
  getStoreReg(regnumber) {
    return axios({
      url: config.host + "/getStoreReg",
      method: "post",
      data: {
        regnumber: regnumber,
      },
    });
  }

  breakUpdate(pause, resume, regnumber) {
    return axios({
      url: config.host + "/breakUpdate",
      method: "post",
      data: {
        pause: pause,
        resume: resume,
        regnumber: regnumber,
      },
    });
  }

  holidayUpdate(holiday, regnumber) {
    return axios({
      url: config.host + "/holidayUpdate",
      method: "post",
      data: {
        holiday: holiday,
        regnumber: regnumber,
      },
    });
  }
}
export default new storeservice();
