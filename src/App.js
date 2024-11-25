import "./resource/css/common.css";
import "./resource/css/custom.css";
import index from "./components/index";
import login from "./components/login";
import mypage from "./components/mypage";
import notice from "./components/notice";
import main_rg from "./components/main_rg";
import inquiry from "./components/inquiry";
import pw_find from "./components/pw_find";
import password from "./components/password";
import sub_home from "./components/sub_home";
import sub_menu from "./components/sub_menu";
import menu_edit from "./components/menu_edit";
import menu_infor from "./components/menu_infor";
import menu_order from "./components/menu_order";
import menu_regist from "./components/menu_regist";
import notice_detail from "./components/notice_detail";
import inquiry_detail from "./components/inquiry_detail";
import inquiry_regist from "./components/inquiry_regist";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Route
        path="/"
        component={sessionStorage?.getItem("regnumber") ? index : login}
        exact={true}
      />
      <Route
        path="/inquiry_detail"
        component={
          sessionStorage?.getItem("regnumber") ? inquiry_detail : login
        }
      />
      <Route
        path="/inquiry_regist"
        component={
          sessionStorage?.getItem("regnumber") ? inquiry_regist : login
        }
      />
      <Route
        path="/inquiry"
        component={sessionStorage?.getItem("regnumber") ? inquiry : login}
      />
      <Route
        path="/main_rg"
        component={sessionStorage?.getItem("regnumber") ? main_rg : login}
      />
      <Route
        path="/menu_edit"
        component={sessionStorage?.getItem("regnumber") ? menu_edit : login}
      />
      <Route
        path="/menu_infor"
        component={sessionStorage?.getItem("regnumber") ? menu_infor : login}
      />
      <Route
        path="/menu_order"
        component={sessionStorage?.getItem("regnumber") ? menu_order : login}
      />
      <Route
        path="/menu_regist"
        component={sessionStorage?.getItem("regnumber") ? menu_regist : login}
      />
      <Route
        path="/mypage"
        component={sessionStorage?.getItem("regnumber") ? mypage : login}
      />
      <Route
        path="/notice_detail"
        component={sessionStorage?.getItem("regnumber") ? notice_detail : login}
      />
      <Route
        path="/notice"
        component={sessionStorage?.getItem("regnumber") ? notice : login}
      />
      <Route
        path="/password"
        component={sessionStorage?.getItem("regnumber") ? password : login}
      />
      <Route
        path="/sub_home"
        component={sessionStorage?.getItem("regnumber") ? sub_home : login}
      />
      <Route
        path="/sub_menu"
        component={sessionStorage?.getItem("regnumber") ? sub_menu : login}
      />
      <Route path="/pw_find" component={pw_find} exact={true}></Route>
    </BrowserRouter>
  );
}

export default App;
