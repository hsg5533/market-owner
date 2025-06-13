import React from "react";
import Nav from "./Nav";
import Header from "./Header";
import config from "../json/config.json";
import storeservice from "../service/storeservice";
import icon_menu from "../resource/img/icon/icon_menu.svg";
import icon_arrow_before from "../resource/img/icon/icon_arrow_before.svg";

class main_rg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      explan: "",
      introduce: "",
      flag: false,
      fileImage: null,
    };
  }

  componentDidMount() {
    storeservice
      .getStoreReg(sessionStorage?.getItem("regnumber"))
      .then((res) => {
        this.setState({
          explan: res.data.explan,
          introduce: res.data.introduce,
          fileImage:
            config.host +
            `/getStoreImg/${sessionStorage?.getItem("regnumber")}`,
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
              <h2>메인사진/소개글 등록</h2>
            </nav>
          </header>
          <section className="sub_main">
            <form
              id="form"
              action={config.host + "/introRegist"}
              method="post"
              encType="multipart/form-data"
              target="iframe"
            >
              <div className="sub_infor_rg">
                <div className="oneline_infor">
                  <input
                    type="hidden"
                    name="regnumber"
                    value={sessionStorage.getItem("regnumber")}
                  />
                  <div className="cont_title">
                    <h3>한줄 소개</h3>
                  </div>
                  <div className="oneline">
                    <input
                      type="text"
                      name="explan"
                      placeholder="한줄 소개글을 입력해주세요"
                      value={this.state.explan}
                      onChange={(event) => {
                        this.setState({ explan: event.target.value });
                      }}
                    />
                  </div>
                </div>
                <div className="infor_photo">
                  <div className="infor_photo_01">
                    <div className="cont_title">
                      <h3>메인 사진</h3>
                    </div>
                    <ul>
                      <li>
                        <p>
                          <div class="filebox">
                            <input
                              id="upload-name"
                              value={this.state.fileName}
                              placeholder="첨부파일"
                            />
                            <label for="file">파일찾기</label>
                            <input
                              type="file"
                              id="file"
                              name="img"
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
                        </p>
                        <div>
                          <a
                            className="delete_btn delete_on"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              URL.revokeObjectURL(this.state.fileImage);
                              this.setState({ fileName: "", fileImage: "" });
                            }}
                          >
                            삭제
                          </a>
                        </div>
                      </li>
                      <li>
                        {this.state.fileImage && (
                          <img
                            src={this.state.fileImage}
                            style={{ margin: "auto" }}
                            onError={(event) => {
                              event.target.src = require("../resource/img/icon/no_img.png");
                            }}
                          />
                        )}
                      </li>
                    </ul>
                  </div>
                  <p className="infor_etc">
                    ＊ 다른 사람의 디자인과 이미지를 허락없이 카피하거나 이용
                    또는 도용할 경우 저작권 침해에 해당됩니다. 디자인 권리침해에
                    대한 손해배상 청구 및 침해죄 형사소송이 있을 수 있으니,
                    이미지 업로드 시 주의를 해주시기 바랍니다.
                  </p>
                </div>
                <div className="infor_cont">
                  <div className="cont_title">
                    <h3>소개글</h3>
                  </div>
                  <textarea
                    name="introduce"
                    placeholder="소개글을 입력해주세요"
                    cols="30"
                    rows="5"
                    value={this.state.introduce}
                    onChange={(event) => {
                      this.setState({ introduce: event.target.value });
                    }}
                  ></textarea>
                </div>
                <div className="cm_btn">
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      document.getElementById("form").submit();
                      this.setState({ flag: !this.state.flag });
                    }}
                  >
                    완료
                  </a>
                </div>
              </div>
            </form>
            <iframe name="iframe" style={{ display: "none" }}></iframe>
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
                      window.location.href = "/sub_home";
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
export default main_rg;
