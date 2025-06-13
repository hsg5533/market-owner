import React from "react";
import Nav from "./Nav";
import Header from "./Header";
import queryString from "query-string";
import config from "../json/config.json";
import productservice from "../service/productservice";
import icon_menu from "../resource/img/icon/icon_menu.svg";
import icon_arrow_before from "../resource/img/icon/icon_arrow_before.svg";

class menu_edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productcode: queryString.parse(window.location.search).product,
      product: {},
      name: "",
      price: "",
      origin: "",
      amount: "",
      fileName: "",
      fileImage: "",
      discount_price: "",
      flag: false,
      deleteFlag: false,
    };
  }

  componentDidMount() {
    productservice.getProductDetail(this.state.productcode).then((res) => {
      this.setState({
        name: res.data.name,
        amount: res.data.amount,
        price: res.data.price,
        discount_price: res.data.discount_price,
        origin: res.data.origin,
        fileImage: config.host + `/getProductImg/${this.state.productcode}`,
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
              <h2>메뉴 수정</h2>
            </nav>
          </header>
          <section className="sub_main">
            <form
              id="form"
              action={config.host + `/productUpdate/${this.state.productcode}`}
              method="post"
              encType="multipart/form-data"
              target="iframe"
            >
              <div className="sub_infor_rg sub_menu_edit">
                <ul className="sub_menu_set">
                  <li>
                    <input
                      id="recommend"
                      name="recommend"
                      type="checkbox"
                      onClick={() => {
                        this.setState({
                          recommend:
                            document.getElementById("recommend").checked,
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
                  <div className="cont_title">
                    <h3>메뉴명</h3>
                  </div>
                  <div className="oneline">
                    <input
                      type="text"
                      name="name"
                      value={this.state.name}
                      onChange={(event) => {
                        this.setState({ name: event.target.value });
                      }}
                      placeholder="메뉴명을 입력해주세요"
                    />
                  </div>
                </div>
                <div className="menu_price">
                  <div className="cont_title">
                    <h3>가격</h3>
                  </div>
                  <div className="menu_price_box">
                    <div>
                      <input
                        type="text"
                        name="amount"
                        value={this.state.amount}
                        placeholder="ex) 단위"
                        onChange={(event) => {
                          this.setState({ amount: event.target.value });
                        }}
                      />
                    </div>
                    <div className="oneline">
                      <input
                        name="price"
                        type="number"
                        value={this.state.price}
                        placeholder="원"
                        onChange={(event) => {
                          this.setState({ price: event.target.value });
                        }}
                      />
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
                          value={this.state.discount_price}
                          type="number"
                          placeholder="원"
                          onChange={(event) => {
                            this.setState({
                              discount_price: event.target.value,
                            });
                          }}
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
                    value={this.state.origin}
                    onChange={(event) => {
                      this.setState({ origin: event.target.value });
                    }}
                  ></textarea>
                </div>
                <div className="infor_photo">
                  <div className="infor_photo_01">
                    <div className="cont_title">
                      <h3>메뉴 사진</h3>
                    </div>
                    <ul>
                      <li>
                        <div className="filebox">
                          <input
                            id="upload-name"
                            value={this.state.fileName}
                            placeholder="첨부파일"
                            readOnly
                          />
                          <label htmlFor="file">파일찾기</label>
                          <input
                            id="file"
                            type="file"
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
                <ul className="btn_box sub_edit_btn">
                  <li className="btn_empty menu_delete_btn">
                    <a
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        this.setState({ deleteFlag: !this.state.deleteFlag });
                      }}
                    >
                      메뉴 삭제
                    </a>
                  </li>
                  <li className="btn_fill menu_complete_btn">
                    <a
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        document.getElementById("form").submit();
                        this.setState({ flag: !this.state.flag });
                      }}
                    >
                      수정
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
                  <p>수정되었습니다.</p>
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
          {this.state.deleteFlag === true ? (
            <aside className="modal_delete">
              <div className="modal_bg"></div>
              <div className="modal_delete_box">
                <div className="delete_tit">
                  <p>해당 상품을 삭제하시겠어요?</p>
                </div>
                <ul className="btn_box modal_delete_btn">
                  <li className="btn_empty md_delete_btn">
                    <a
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        productservice
                          .deleteProduct(this.state.productcode)
                          .then(() => {
                            this.props.history.goBack();
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
                        this.setState({ deleteFlag: !this.state.deleteFlag });
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
export default menu_edit;
