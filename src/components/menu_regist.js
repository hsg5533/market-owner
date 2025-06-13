import React from "react";
import Nav from "./Nav";
import config from "../json/config.json";
import storeservice from "../service/storeservice";
import icon_menu from "../resource/img/icon/icon_menu.svg";
import icon_arrow_before from "../resource/img/icon/icon_arrow_before.svg";

class menu_regist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      store: {},
      flag: false,
      recommend: null,
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
              <div className="main_tit">
                <a href="/"> {this.state.store.name}</a>
              </div>
            </div>
            <Nav />
            <nav className="sub_tab">
              <div className="before_icon">
                <a
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    window.location.href = "/sub_menu";
                  }}
                >
                  <img src={icon_arrow_before} alt="이전" />
                </a>
              </div>
              <h2>메뉴 등록</h2>
            </nav>
          </header>
          <section className="sub_main">
            <form
              id="form"
              action={config.host + `/productRegist/${this.state.store.code}`}
              method="post"
              enctype="multipart/form-data"
              target="iframe"
            >
              <div className="sub_infor_rg sub_menu_edit">
                <ul className="sub_menu_set">
                  <li>
                    <input
                      name="recommend"
                      type="checkbox"
                      onClick={(event) => {
                        this.setState({
                          recommend: event.target.checked,
                        });
                      }}
                    />
                  </li>
                  <li>
                    <h3>대표메뉴 설정</h3>
                    <p>대표메뉴는 5개까지 등록가능합니다.</p>
                  </li>
                </ul>
                <div className="oneline_infor">
                  <input
                    type="hidden"
                    name="category_code"
                    value={this.state.store.category_code}
                    readOnly
                  />
                  <input
                    type="hidden"
                    name="regnumber"
                    value={this.state.store.regnumber}
                    readOnly
                  />
                  <input
                    type="hidden"
                    name="storename"
                    value={this.state.store.name}
                    readOnly
                  />
                  <div className="cont_title">
                    <h3>메뉴명</h3>
                  </div>
                  <div className="oneline">
                    <input
                      name="name"
                      type="text"
                      placeholder="메뉴명을 입력해주세요"
                    />
                  </div>
                </div>
                <div id="price" className="menu_price">
                  <div className="cont_title">
                    <h3>가격</h3>
                  </div>
                  <div className="menu_price_box">
                    <div>
                      <input name="amount" type="number" placeholder="단위" />
                    </div>
                    <div className="oneline">
                      <input name="price" type="number" placeholder="원" />
                    </div>
                  </div>
                  <div id="newprice" className="menu_price">
                    <div className="cont_title">
                      <h3>할인가격</h3>
                    </div>
                    <div className="menu_price_box">
                      <div className="oneline">
                        <input
                          name="discount_price"
                          type="number"
                          placeholder="원"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="infor_cont">
                  <div className="cont_title">
                    <h3>원산지</h3>
                  </div>
                  <textarea
                    cols="30"
                    rows="5"
                    name="origin"
                    placeholder="원산지를 입력해주세요"
                  ></textarea>
                </div>
                <div className="infor_photo">
                  <div className="infor_photo_01">
                    <div className="cont_title">
                      <h3>메뉴 사진</h3>
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
                        <div>
                          <a
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              URL.revokeObjectURL(this.state.fileImage);
                              this.setState({ fileName: "", fileImage: "" });
                            }}
                            className="delete_btn delete_on"
                          >
                            삭제
                          </a>
                        </div>
                      </li>
                      <li>
                        <a className="photo_select">
                          {this.state.fileImage && (
                            <img
                              src={this.state.fileImage}
                              style={{ margin: "auto" }}
                            />
                          )}
                        </a>
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
                <ul className="btn_box sub_edit_btn">
                  <li className="disabled_btn btn_empty">
                    <a href="#">메뉴 삭제</a>
                  </li>
                  <li className="btn_fill menu_complete_btn">
                    <a
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        document.getElementById("form").submit();
                        this.setState({ flag: !this.state.flag });
                      }}
                    >
                      완료
                    </a>
                  </li>
                </ul>
              </div>
            </form>
            <iframe name="iframe" style={{ display: "none" }}></iframe>
          </section>
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
                      window.location.href = "/sub_menu";
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
export default menu_regist;
