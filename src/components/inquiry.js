import React from "react";
import Nav from "./Nav";
import moment from "moment";
import Header from "./Header";
import inquiryservice from "../service/inquiryservice";
import icon_menu from "../resource/img/icon/icon_menu.svg";
import icon_arrow_before from "../resource/img/icon/icon_arrow_before.svg";

class inquiry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inquirys: [],
    };
  }

  componentDidMount() {
    inquiryservice.getInquiry().then((res) => {
      this.setState({ inquirys: res.data });
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
              <h2>문의하기</h2>
            </nav>
          </header>
          <section className="sub_main">
            <div className="cm_btn">
              <a href="/inquiry_regist">문의 등록</a>
            </div>
            <div className="sub_question">
              <div className="sub_qt_box">
                {this.state.inquirys.map((inquiry) => (
                  <div>
                    <ul className="sub_qt_list">
                      <li>
                        <a href={`/inquiry_detail?num=${inquiry.num}`}>
                          {inquiry.title}
                        </a>
                      </li>
                      <li>
                        {moment(inquiry.regdate).format("YYYY-MM-DD HH:mm:ss")}
                      </li>
                    </ul>
                    {inquiry.reply === "n" ? (
                      <div className="mark_confirm">확인 중</div>
                    ) : (
                      <div className="mark_answer">답변 완료</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }
}
export default inquiry;
