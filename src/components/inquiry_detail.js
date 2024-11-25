import React from "react";
import Nav from "./Nav";
import moment from "moment";
import Header from "./Header";
import queryString from "query-string";
import config from "../json/config.json";
import inquiryservice from "../service/inquiryservice";
import icon_menu from "../resource/img/icon/icon_menu.svg";
import icon_arrow_before from "../resource/img/icon/icon_arrow_before.svg";

class inquiry_detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: queryString.parse(window.location.search).num,
      replies: [],
      inquiry: {},
      regdate: "",
      flag: false,
    };
  }

  componentDidMount() {
    inquiryservice.getInquiryDetail(this.state.num).then((res) => {
      this.setState({ inquiry: res.data, regdate: res.data.regdate });
    });
    inquiryservice.getInquiryReply(this.state.num).then((res) => {
      this.setState({ replies: res.data });
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
                    window.location.href = "/inquiry";
                  }}
                >
                  <img src={icon_arrow_before} alt="이전" />
                </a>
              </div>
              <h2>문의 글 확인</h2>
            </nav>
          </header>
          <section className="sub_main">
            <div className="sub_inquiry_detail">
              <div className="inquiry_detail">
                <div className="inquiry_tit">
                  <div>
                    <h3>{this.state.inquiry.title}</h3>
                    {this.state.inquiry.reply === "n" ? (
                      <div className="mark_confirm">확인 중</div>
                    ) : (
                      <div className="mark_answer">답변 완료</div>
                    )}
                  </div>
                  <p>
                    {moment(this.state.regdate).format("YYYY-MM-DD HH:mm:ss")}
                  </p>
                </div>
                <div className="inquiry_cont">
                  <p>{this.state.inquiry.content}</p>
                  <p>
                    <img
                      style={{ width: "300px", height: "300px" }}
                      src={
                        config.host + `/getInquiryImg/${this.state.inquiry.num}`
                      }
                      onError={(event) => {
                        event.target.style.display = "none";
                      }}
                    />
                  </p>
                </div>
                {this.state.replies.map((reply) => (
                  <div className="answer_cont">
                    <p>{reply.content}</p>
                  </div>
                ))}
              </div>
              <ul className="btn_box inquiry_btn">
                <li className="btn_empty">
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      this.setState({ flag: !this.state.flag });
                    }}
                  >
                    삭제
                  </a>
                </li>
                <li className="btn_fill">
                  <a href="/inquiry">확인</a>
                </li>
              </ul>
            </div>
          </section>
          {this.state.flag === true ? (
            <aside className="modal_delete">
              <div className="modal_bg"></div>
              <div className="modal_delete_box">
                <div className="delete_tit">
                  <p>해당 문의 글을 삭제하시겠어요?</p>
                </div>
                <ul className="btn_box modal_delete_btn">
                  <li className="btn_empty md_delete_btn">
                    <a
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        inquiryservice
                          .deleteInquiry(this.state.num)
                          .then(() => {
                            window.location.href = "/inquiry";
                          });
                      }}
                    >
                      삭제
                    </a>
                  </li>
                  <li className="btn_fill md_cancel_btn">
                    <a
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        this.setState({ flag: !this.state.flag });
                      }}
                    >
                      취소
                    </a>
                  </li>
                </ul>
              </div>
            </aside>
          ) : null}
        </main>
      </div>
    );
  }
}
export default inquiry_detail;
