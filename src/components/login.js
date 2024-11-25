import React from "react";
import storeadminservice from "../service/storeadminservice";

class login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      regnumber: "",
      password: "",
      token: "",
      flag: false,
    };
  }

  componentDidMount() {
    document.addEventListener("message", (event) => {
      this.setState({ token: event.data });
    });
  }

  render() {
    return (
      <div className="wrap">
        <section className="login_page">
          <div className="login_tit">
            <h1>
              사장님 페이지
              <br />
              <span>로그인</span>
            </h1>
          </div>
          <div className="login_cont">
            <div>
              <input
                type="tel"
                placeholder="아이디"
                value={this.state.regnumber}
                onChange={(event) => {
                  this.setState({ regnumber: event.target.value });
                }}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="비밀번호"
                value={this.state.password}
                onChange={(event) => {
                  this.setState({ password: event.target.value });
                }}
              />
            </div>
          </div>
          <div className="login_btn">
            <a
              style={{ cursor: "pointer" }}
              onClick={() => {
                storeadminservice
                  .login(this.state.regnumber, this.state.password)
                  .then(() => {
                    let sessionStorage = window.sessionStorage;
                    sessionStorage.setItem("regnumber", this.state.regnumber);
                    sessionStorage.setItem("password", this.state.password);
                    sessionStorage.setItem("token", this.state.token);
                    window.location.reload();
                  })
                  .catch(() => {
                    this.setState({ flag: !this.state.flag });
                  });
              }}
            >
              로그인
            </a>
          </div>
          <div className="login_find">
            <a href="/pw_find">비밀번호 찾기</a>
          </div>
        </section>
        {this.state.flag === true ? (
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
                    this.setState({ flag: !this.state.flag });
                  }}
                >
                  확인
                </a>
              </div>
            </div>
          </aside>
        ) : null}
      </div>
    );
  }
}
export default login;
