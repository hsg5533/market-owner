import React from "react";
import Nav from "./Nav";
import Header from "./Header";
import config from "../json/config.json";
import storeservice from "../service/storeservice";
import icon_menu from "../resource/img/icon/icon_menu.svg";
import icon_arrow_before from "../resource/img/icon/icon_arrow_before.svg";

class inquiry_regist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      store: {},
      flag: false,
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
              <Header />
            </div>
            <Nav />
            <nav className="sub_tab">
              <div className="before_icon">
                <a
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    this.props.history.goBack();
                  }}
                >
                  <img src={icon_arrow_before} alt="이전" />
                </a>
              </div>
              <h2>문의 등록</h2>
            </nav>
          </header>
          <section className="sub_main">
            <form
              id="form"
              action={config.host + "/inquiryRegist"}
              method="post"
              enctype="multipart/form-data"
              target="iframe"
            >
              <div className="sub_infor_rg">
                <div className="oneline_infor">
                  <div className="cont_title">
                    <h3>제목</h3>
                  </div>
                  <div className="oneline">
                    <input type="text" name="title" placeholder="제목" />
                  </div>
                </div>
                <div className="oneline_infor">
                  <div className="cont_title">
                    <h3>작성자</h3>
                  </div>
                  <div className="oneline">
                    <input
                      type="text"
                      name="writer"
                      placeholder="작성자"
                      value={this.state.store.owner}
                      readOnly
                    />
                  </div>
                </div>
                <div className="infor_cont">
                  <div className="cont_title">
                    <h3>내용</h3>
                  </div>
                  <textarea
                    cols="30"
                    rows="5"
                    name="content"
                    placeholder="내용"
                  ></textarea>
                </div>
                <div className="infor_photo inquiry_photo">
                  <div className="infor_photo_01">
                    <div className="cont_title">
                      <h3>사진 첨부</h3>
                    </div>
                    <ul>
                      <li>
                        <div class="filebox">
                          <input
                            id="upload-name"
                            value={this.state.fileName}
                            placeholder="첨부파일"
                            readOnly
                          />
                          <label for="file">파일찾기</label>
                          <input
                            type="file"
                            id="file"
                            name="imgUpload"
                            accept="image/*"
                            multiple
                            onChange={(event) => {
                              this.setState({
                                fileName: event.target.value,
                                fileImage: URL.createObjectURL(
                                  event.target.files[0]
                                ),
                              });
                            }}
                          />
                        </div>
                        <div>
                          <a
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              URL.revokeObjectURL(this.state.fileImage);
                              this.setState({ fileImage: "", fileName: "" });
                            }}
                            className="delete_btn delete_on"
                          >
                            삭제
                          </a>
                        </div>
                      </li>
                      <li>
                        {this.state.fileImage && (
                          <img
                            alt="sample"
                            src={this.state.fileImage}
                            style={{ margin: "auto" }}
                          />
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="cm_btn">
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      document.getElementById("form").submit();
                      this.setState({ flag: !this.state.flag });
                    }}
                  >
                    작성 완료
                  </a>
                </div>
              </div>
            </form>
          </section>
          <iframe name="iframe" style={{ display: "none" }}></iframe>
          {this.state.flag === true ? (
            <aside className="modal_delete modal_pw_complete">
              <div className="modal_bg"></div>
              <div className="modal_delete_box modal_complete_box">
                <div className="delete_tit">
                  <p>등록되었습니다.</p>
                </div>
                <div className="cm_btn modal_reset_btn">
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      this.setState({ flag: !this.state.flag });
                      window.location.href = "/inquiry";
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
export default inquiry_regist;
