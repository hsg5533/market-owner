import React from "react";
import Nav from "./Nav";
import Header from "./Header";
import moment from "moment/moment";
import queryString from "query-string";
import config from "../json/config.json";
import noticeservice from "../service/noticeservice";
import icon_menu from "../resource/img/icon/icon_menu.svg";
import icon_arrow_before from "../resource/img/icon/icon_arrow_before.svg";

class notice_detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: queryString.parse(window.location.search).num,
      notice: {},
    };
  }

  componentDidMount() {
    noticeservice.getNoticeDetail(this.state.num).then((res) => {
      this.setState({ notice: res.data });
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
              <Header />
            </div>
            <Nav />
            <nav className="sub_tab">
              <div className="before_icon">
                <a
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    window.location.href = "/notice";
                  }}
                >
                  <img src={icon_arrow_before} alt="이전" />
                </a>
              </div>
              <h2>공지사항</h2>
            </nav>
          </header>
          <section className="sub_main">
            <div className="sub_notice_detail">
              <div className="notice_detail">
                <div className="notice_tit">
                  <h3>{this.state.notice.title}</h3>
                  <p>
                    {moment(this.state.notice.regdate).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )}
                  </p>
                </div>
                <div className="notice_detail_cont">
                  <p>{this.state.notice.content}</p>
                  <p>
                    <img
                      src={
                        config.host + `/getNoticeImg/${this.state.notice.num}`
                      }
                      onError={(event) => {
                        event.target.style.display = "none";
                      }}
                    />
                  </p>
                </div>
              </div>
              <div className="cm_btn">
                <a href="/notice">확인</a>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }
}
export default notice_detail;
