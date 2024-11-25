import React from "react";
import moment from "moment";
import Nav from "./Nav";
import Header from "./Header";
import noticeservice from "../service/noticeservice";
import icon_menu from "../resource/img/icon/icon_menu.svg";
import icon_arrow_before from "../resource/img/icon/icon_arrow_before.svg";

class notice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      store: {},
      notices: [],
    };
  }

  componentDidMount() {
    noticeservice.getNotice().then((res) => {
      this.setState({ notices: res.data });
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
                    window.location.href = "/";
                  }}
                >
                  <img src={icon_arrow_before} alt="이전" />
                </a>
              </div>
              <h2>공지사항</h2>
            </nav>
          </header>
          <section className="sub_main">
            <div className="sub_notice">
              <div className="sub_notice_box">
                {this.state.notices.map((notice) => (
                  <ul>
                    <li>
                      <a href={`/notice_detail?num=${notice.num}`}>
                        {notice.title}
                      </a>
                    </li>
                    <li>
                      {moment(notice.regdate).format("YYYY-MM-DD HH:mm:ss")}
                    </li>
                  </ul>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }
}
export default notice;
