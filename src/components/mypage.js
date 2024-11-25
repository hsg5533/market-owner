import React from "react";
import Nav from "./Nav";
import storeservice from "../service/storeservice";
import categoryservice from "../service/categoryservice";
import icon_menu from "../resource/img/icon/icon_menu.svg";
import icon_arrow_before from "../resource/img/icon/icon_arrow_before.svg";

class mypage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      store: {},
      category: {},
      pause: "",
      resume: "",
      holiday: "",
      flag: false,
      hour: [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
      ],
    };
  }

  componentDidMount() {
    storeservice
      .getStoreReg(sessionStorage?.getItem("regnumber"))
      .then((res) => {
        this.setState({ store: res.data, holiday: res.data.holiday });
        categoryservice
          .getCategoryDetail(res.data.category_code)
          .then((res) => {
            this.setState({ category: res.data });
          });
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
              <h2>마이페이지</h2>
            </nav>
          </header>
          <section className="sub_main">
            <div className="sub_mypage">
              <div className="cm_btn">
                <a href="/password">비밀번호 변경</a>
              </div>
              <div className="mypage_cont">
                <div className="franchise">
                  <div className="cont_title cont_tit">
                    <h3>가맹점</h3>
                  </div>
                  <div className="fh_cont">
                    <ul className="fh_cont_box">
                      <li>가맹점명</li>
                      <li>{this.state.store.name}</li>
                    </ul>
                    <ul className="fh_cont_box">
                      <li>사업자 번호</li>
                      <li>{this.state.store.regnumber}</li>
                    </ul>
                    <ul className="fh_cont_box">
                      <li>대표자명</li>
                      <li>{this.state.store.owner}</li>
                    </ul>
                  </div>
                </div>
                <div className="franschise_infor">
                  <div className="cont_title cont_tit">
                    <h3>가맹점 상세 정보</h3>
                  </div>
                  <div className="fh_cont">
                    <ul className="fh_cont_box">
                      <li>카테고리</li>
                      <li>{this.state.category.name}</li>
                    </ul>
                    <ul className="fh_cont_box">
                      <li>전화번호</li>
                      <li>{this.state.store.tel}</li>
                    </ul>
                    <ul className="fh_cont_box">
                      <li>
                        브레이크
                        <br />
                        타임
                      </li>
                      <li>
                        <ul className="fh_break_off">
                          <li>
                            <input
                              type="checkbox"
                              id="nobreak"
                              onClick={(event) => {
                                if (event.target.checked) {
                                  document.getElementById(
                                    "break"
                                  ).disabled = true;
                                  document.getElementById(
                                    "pause"
                                  ).disabled = true;
                                  document.getElementById(
                                    "resume"
                                  ).disabled = true;
                                  this.setState({
                                    pause: "-",
                                    resume: "-",
                                  });
                                } else {
                                  document.getElementById(
                                    "break"
                                  ).disabled = false;
                                  this.setState({
                                    pause: this.state.store.pause,
                                    resume: this.state.store.resume,
                                  });
                                }
                              }}
                            />
                          </li>
                          <li>브레이크 타임 없음</li>
                        </ul>
                        <ul className="fh_break_on">
                          <li>
                            <input
                              type="checkbox"
                              id="break"
                              onClick={(event) => {
                                if (event.target.checked) {
                                  document.getElementById(
                                    "nobreak"
                                  ).disabled = true;
                                  document.getElementById(
                                    "pause"
                                  ).disabled = false;
                                  document.getElementById(
                                    "resume"
                                  ).disabled = false;
                                  this.setState({
                                    pause: this.state.pause,
                                    resume: this.state.resume,
                                  });
                                } else {
                                  document.getElementById(
                                    "nobreak"
                                  ).disabled = false;
                                  document.getElementById(
                                    "pause"
                                  ).disabled = true;
                                  document.getElementById(
                                    "resume"
                                  ).disabled = true;
                                }
                              }}
                            />
                          </li>
                          <li>브레이크 타임 있음</li>
                        </ul>
                        <div className="fh_time">
                          <ul>
                            <li>
                              <div className="fh_hour">
                                <select
                                  id="pause"
                                  disabled
                                  onChange={(event) => {
                                    this.setState({
                                      pause: event.target.value,
                                    });
                                  }}
                                >
                                  {this.state.hour.map((hour) => (
                                    <option
                                      value={`${hour}시`}
                                      selected={
                                        this.state.store.pause === `${hour}시`
                                          ? true
                                          : false
                                      }
                                    >
                                      {hour}시
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="fh_minute">
                                <select>
                                  <option value="00분" disabled selected>
                                    00분
                                  </option>
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                </select>
                              </div>
                            </li>
                            <li>부터</li>
                          </ul>
                          <ul>
                            <li>
                              <div className="fh_hour">
                                <select
                                  id="resume"
                                  disabled
                                  onChange={(event) => {
                                    this.setState({
                                      resume: event.target.value,
                                    });
                                  }}
                                >
                                  {this.state.hour.map((hour) => (
                                    <option
                                      value={`${hour}시`}
                                      selected={
                                        this.state.store.resume === `${hour}시`
                                          ? true
                                          : false
                                      }
                                    >
                                      {hour}시
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="fh_minute">
                                <select>
                                  <option value="00분" disabled selected>
                                    00분
                                  </option>
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                </select>
                              </div>
                            </li>
                            <li>까지</li>
                          </ul>
                        </div>
                        <ul className="fh_btn">
                          <li className="btn_empty">
                            <a
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                this.setState({
                                  pause: this.state.store.pause,
                                  resume: this.state.store.resume,
                                });
                              }}
                            >
                              취소
                            </a>
                          </li>
                          <li className="btn_fill">
                            <a
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                storeservice
                                  .breakUpdate(
                                    this.state.pause,
                                    this.state.resume,
                                    this.state.store.regnumber
                                  )
                                  .then(() => {
                                    this.setState({ flag: true });
                                  });
                              }}
                            >
                              완료
                            </a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                    <ul className="fh_cont_box">
                      <li>휴무일</li>
                      <li className="fh_closed">
                        <div>
                          <input
                            type="text"
                            value={this.state.holiday}
                            placeholder="휴무일을 입력해주세요."
                            onChange={(event) => {
                              this.setState({ holiday: event.target.value });
                            }}
                          />
                        </div>
                        <ul className="fh_btn">
                          <li className="btn_empty">
                            <a
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                this.setState({
                                  holiday: this.state.store.holiday,
                                });
                              }}
                            >
                              취소
                            </a>
                          </li>
                          <li className="btn_fill">
                            <a
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                storeservice
                                  .holidayUpdate(
                                    this.state.holiday,
                                    this.state.store.regnumber
                                  )
                                  .then(() => {
                                    this.setState({ flag: true });
                                  });
                              }}
                            >
                              완료
                            </a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                    <ul className="fh_cont_box">
                      <li>주소</li>
                      <li>{this.state.store.address}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {this.state.flag === true ? (
            <aside className="modal_delete modal_pw_complete">
              <div className="modal_bg"></div>
              <div className="modal_delete_box modal_complete_box">
                <div className="delete_tit">
                  <p>수정되었습니다.</p>
                </div>
                <div className="cm_btn modal_reset_btn">
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      this.setState({ flag: !this.state.flag });
                      window.location.reload();
                    }}
                  >
                    확인
                  </a>
                </div>
              </div>
            </aside>
          ) : null}
        </main>
      </div>
    );
  }
}
export default mypage;
