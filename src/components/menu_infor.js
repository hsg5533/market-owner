import React from "react";
import Nav from "./Nav";
import Header from "./Header";
import queryString from "query-string";
import config from "../json/config.json";
import productservice from "../service/productservice";
import icon_menu from "../resource/img/icon/icon_menu.svg";
import icon_arrow_before from "../resource/img/icon/icon_arrow_before.svg";

class menu_infor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productcode: queryString.parse(window.location.search).product,
      product: {},
      flag: false,
    };
  }

  componentDidMount() {
    // 가맹점 상품 출력
    productservice.getProductDetail(this.state.productcode).then((res) => {
      this.setState({ product: res.data });
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
                    window.location.href = "/sub_menu";
                  }}
                >
                  <img src={icon_arrow_before} alt="이전" />
                </a>
              </div>
              <h2>메뉴 정보</h2>
            </nav>
          </header>
          <section className="sub_main">
            <div className="sub_menu_infor">
              <div className="menu_infor_tit">
                <h1>{this.state.product.name}</h1>
              </div>
              <div className="menu_infor_tit">
                <p>
                  {this.state.product.amount} : {this.state.product.price}
                  &nbsp;원
                </p>
              </div>
              <div className="menu_infor_txt">
                <p>{this.state.product.origin}</p>
                <img
                  src={config.host + `/getProductImg/${this.state.productcode}`}
                  onError={(event) => {
                    event.target.src = require("../resource/img/icon/no_img.png");
                  }}
                />
              </div>
              <ul className="btn_box menu_infor_btn">
                <li className="btn_empty infor_delete_btn">
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      this.setState({ flag: !this.state.flag });
                    }}
                  >
                    삭제
                  </a>
                </li>
                <li className="btn_fill infor_complete_btn">
                  <a href={`/menu_edit?product=${this.state.productcode}`}>
                    수정
                  </a>
                </li>
              </ul>
            </div>
          </section>
          {this.state.flag === true ? (
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
export default menu_infor;
