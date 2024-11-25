import React from "react";
import Nav from "./Nav";
import Header from "./Header";
import icon_menu from "../resource/img/icon/icon_menu.svg";
import storeadminservice from "../service/storeadminservice";
import icon_arrow_before from "../resource/img/icon/icon_arrow_before.svg";

class password extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: null,
      password: null,
      new_password: null,
      new_password_check: null,
    };
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
                    window.location.href = "/mypage";
                  }}
                >
                  <img src={icon_arrow_before} alt="이전" />
                </a>
              </div>
              <h2>비밀번호 변경</h2>
            </nav>
          </header>
          <section className="sub_main">
            <div className="sub_infor_rg password_rg">
              <div className="pw_cont">
                <div className="cont_title pw_disabled">
                  <h3>사업자 번호</h3>
                  <input
                    type="text"
                    placeholder={sessionStorage.getItem("regnumber")}
                    disabled
                  />
                </div>
              </div>
              <div className="pw_cont">
                <div className="pw_list">
                  <div className="cont_title">
                    <h3>현재 비밀번호</h3>
                    <div className="oneline">
                      <input
                        type="password"
                        placeholder="현재 비밀번호"
                        value={this.state.password}
                        onChange={(event) => {
                          this.setState({ password: event.target.value });
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="pw_list">
                  <div className="cont_title">
                    <h3>새 비밀번호</h3>
                    <div className="oneline">
                      <input
                        type="password"
                        name="password"
                        placeholder="새 비밀번호"
                        value={this.state.new_password}
                        onChange={(event) => {
                          this.setState({ new_password: event.target.value });
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="pw_list">
                  <div className="cont_title">
                    <h3>새 비밀번호 확인</h3>
                    <input
                      type="password"
                      placeholder="새 비밀번호 확인 "
                      value={this.state.new_password_check}
                      onChange={(event) => {
                        this.setState({
                          new_password_check: event.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="cm_btn">
                <a
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    if (
                      this.state.password ===
                        sessionStorage.getItem("password") &&
                      this.state.new_password === this.state.new_password_check
                    ) {
                      storeadminservice
                        .changePassword(this.state.new_password)
                        .then(() => {
                          this.setState({ flag: true });
                        });
                    } else if (
                      this.state.new_password !== this.state.new_password_check
                    ) {
                      this.setState({ flag: false });
                    } else {
                      this.setState({ flag: false });
                    }
                  }}
                >
                  변경 완료
                </a>
              </div>
            </div>
          </section>
          {this.state.flag === true ? (
            <aside className="modal_delete modal_pw_complete">
              <div className="modal_bg"></div>
              <div className="modal_delete_box modal_complete_box">
                <div className="delete_tit">
                  <p>
                    수정되었습니다.
                    <br />
                    다시 로그인해주세요.
                  </p>
                </div>
                <div className="cm_btn modal_reset_btn">
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      this.setState({ flag: null });
                      sessionStorage.clear();
                      window.location.href = "/";
                    }}
                  >
                    확인
                  </a>
                </div>
              </div>
            </aside>
          ) : null}
          {this.state.flag === false ? (
            <aside className="modal_delete modal_pw_complete">
              <div className="modal_bg"></div>
              <div className="modal_delete_box modal_complete_box">
                <div className="delete_tit">
                  <p>입력된 정보를 확인해주세요.</p>
                </div>
                <div className="cm_btn modal_reset_btn">
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      this.setState({ flag: null });
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
export default password;
