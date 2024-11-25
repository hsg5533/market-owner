import React from "react";
import Nav from "./Nav";
import Header from "./Header";
import config from "../json/config.json";
import storeservice from "../service/storeservice";
import productservice from "../service/productservice";
import icon_menu from "../resource/img/icon/icon_menu.svg";
import icon_rep_03 from "../resource/img/icon/icon_rep_03.svg";
import icon_arrow_before from "../resource/img/icon/icon_arrow_before.svg";

class sub_menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
    };
  }

  componentDidMount() {
    storeservice
      .getStoreReg(sessionStorage?.getItem("regnumber"))
      .then((res) => {
        productservice.getProductStore(res.data.code).then((res) => {
          this.setState({ product: res.data });
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
                    window.location.href = "/";
                  }}
                >
                  <img src={icon_arrow_before} alt="이전" />
                </a>
              </div>
              <h2>메뉴</h2>
            </nav>
          </header>
          <section className="sub_main">
            <div className="sub_menu">
              <ul className="sub_menu_btn">
                <li>
                  <a href="/menu_regist">메뉴 등록</a>
                </li>
                <li>
                  <a href="/menu_order">순서변경</a>
                </li>
              </ul>
              <div className="sub_menu_cont">
                {this.state.product.map((product, index) => (
                  <ul key={index}>
                    <li className="menu_detail">
                      <div className="menu_number">
                        <span>{index + 1}</span>
                      </div>
                      <div className="menu_detail_img">
                        <a href={`/menu_infor?product=${product.code}`}>
                          <img
                            src={config.host + `/getProductImg/${product.code}`}
                            onError={(event) => {
                              event.target.src = require("../resource/img/icon/no_img.png");
                            }}
                          />
                          <div className="icon_menu">
                            {product.recommend === "on" ? (
                              <img src={icon_rep_03} alt="대표메뉴" />
                            ) : null}
                          </div>
                        </a>
                      </div>
                      <div className="sub_menu_txt">
                        <a href={`/menu_infor?product=${product.code}`}>
                          <h3 className="sub_menu_tit">{product.name}</h3>
                          <p>
                            {product.amount}&nbsp;:&nbsp;
                            {product.price.replace(
                              /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                              ","
                            )}
                            &nbsp;원
                          </p>
                        </a>
                      </div>
                    </li>
                    <li className="menu_edit_btn">
                      <a href={`/menu_edit?product=${product.code}`}>수정</a>
                    </li>
                  </ul>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }
}
export default sub_menu;
