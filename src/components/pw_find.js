import React from "react";
import storeadminservice from "../service/storeadminservice";
import icon_arrow_before from "../resource/img/icon/icon_arrow_before.svg";

class pw_find extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: null,
    };
  }

  render() {
    return (
      <div className="wrap">
        <main className="sub_page">
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
            <h2>비밀번호 찾기</h2>
          </nav>
          <section className="sub_pw">
            <div className="sub_infor_rg password_rg">
              <div className="pw_cont">
                <div className="pw_list">
                  <div className="cont_title">
                    <h3>업소명</h3>
                    <div className="oneline">
                      <input type="text" id="name" placeholder="업소명" />
                    </div>
                  </div>
                </div>
                <div className="pw_list">
                  <div className="cont_title">
                    <h3>대표자명</h3>
                    <div className="oneline">
                      <input type="text" id="owner" placeholder="대표자명" />
                    </div>
                  </div>
                </div>
                <div className="pw_list">
                  <div className="cont_title">
                    <h3>대표자 휴대폰 번호</h3>
                    <input
                      type="text"
                      id="phone"
                      placeholder="' - ' 없이 숫자만 입력해주세요"
                    />
                  </div>
                </div>
              </div>
              <p style={{ textAlign: "center" }}>
                ※초기화 되는 비밀번호는 대표자 휴대폰번호 끝 4자리입니다※
              </p>
              <div className="cm_btn reset_btn">
                <a
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    storeadminservice
                      .resetPassword(
                        document.getElementById("name").value,
                        document.getElementById("owner").value,
                        document.getElementById("phone").value
                      )
                      .then(() => {
                        this.setState({ flag: true });
                      })
                      .catch(() => {
                        this.setState({ flag: false });
                      });
                  }}
                >
                  비밀번호 초기화
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
                    비밀번호 초기화가
                    <br />
                    완료되었습니다.
                  </p>
                </div>
                <div className="cm_btn modal_reset_btn">
                  <a
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
                      this.setState({ flag: !this.state.flag });
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
export default pw_find;
