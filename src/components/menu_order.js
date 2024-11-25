import React from "react";
import Nav from "./Nav";
import Header from "./Header";
import config from "../json/config.json";
import storeservice from "../service/storeservice";
import productservice from "../service/productservice";
import icon_menu from "../resource/img/icon/icon_menu.svg";
import icon_rep_03 from "../resource/img/icon/icon_rep_03.svg";
import icon_order_top from "../resource/img/icon/icon_order_top.svg";
import icon_order_down from "../resource/img/icon/icon_order_down.svg";
import icon_arrow_before from "../resource/img/icon/icon_arrow_before.svg";

class menu_order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      selectedMenu: "",
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
                    window.location.href = "/sub_menu";
                  }}
                >
                  <img src={icon_arrow_before} alt="이전" />
                </a>
              </div>
              <h2>메뉴 순서 변경</h2>
            </nav>
          </header>
          <section className="sub_main">
            <div className="sub_menu sub_menu_order">
              <div className="sub_menu_cont">
                {this.state.product.map((product, index) => (
                  <ul className="sub_order_list" key={index}>
                    <li className="menu_detail">
                      <div className="menu_number">
                        <span>{index + 1}</span>
                      </div>
                      <div className="menu_detail_img">
                        <a href="/menu_infor">
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
                        <h3 className="sub_menu_tit">{product.name}</h3>
                        <p>
                          {product.amount} : {product.price}
                        </p>
                      </div>
                    </li>
                  </ul>
                ))}
              </div>
            </div>
            <div className="sub_order_btn cm_btn">
              <a href="#">완료</a>
            </div>
          </section>
          <aside className="up_down_btn">
            <ul>
              <li>
                <a href="#">최상단</a>
              </li>
              <li>
                <a href="#">
                  <img src={icon_order_top} alt="한칸 위로" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src={icon_order_down} alt="한칸 아래로" />
                </a>
              </li>
              <li>
                <a href="#">최하단</a>
              </li>
            </ul>
          </aside>
        </main>
      </div>
    );
  }
}
export default menu_order;
