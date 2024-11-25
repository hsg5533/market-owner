import React from "react";
import Nav from "./Nav";
import config from "../json/config.json";
import storeservice from "../service/storeservice";
import icon_menu from "../resource/img/icon/icon_menu.svg";
import icon_arrow_before from "../resource/img/icon/icon_arrow_before.svg";

class sub_home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      store: {},
    };
  }

  componentDidMount() {
    storeservice
      .getStoreReg(sessionStorage?.getItem("regnumber"))
      .then((res) => {
        this.setState({ store: res.data });
      });
  }

  render() {
    return (
      <div className="wrap">
        <main className="sub_page">
          <header className="main_title">
            <div className="main_header">
              <div className="menu_icon">
                <a href="#">
                  <img src={icon_menu} alt="메뉴" />
                </a>
              </div>
              <div className="main_tit">
                <a href="/"> {this.state.store.name} </a>
              </div>
            </div>
            <Nav />
            <nav className="sub_tab">
              <div className="before_icon">
                <a
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    window.location.href = "/";
                  }}
                >
                  <img src={icon_arrow_before} alt="이전" />
                </a>
              </div>
              <h2>메인사진/소개글</h2>
            </nav>
          </header>
          <section className="sub_main">
            <div className="sub_infor">
              <div className="cm_btn">
                <a href="/main_rg">수정</a>
              </div>
              <div className="sub_infor_cont">
                <div className="sub_infor_tit">
                  <h2>{this.state.store.explan}</h2>
                </div>
                <ul className="sub_infor_img">
                  <li>
                    <img
                      style={{ width: 500, height: 500 }}
                      src={
                        config.host +
                        `/getStoreImg/${sessionStorage?.getItem("regnumber")}`
                      }
                      onError={(event) => {
                        event.target.src = require("../resource/img/icon/no_img.png");
                      }}
                    />
                  </li>
                </ul>
                <div className="sub_infor_tit">
                  <p>{this.state.store.introduce}</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }
}
export default sub_home;
