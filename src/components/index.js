import React from "react";
import Nav from "./Nav";
import moment from "moment";
import config from "../json/config.json";
import pushservice from "../service/pushservice";
import visitservice from "../service/visitservice";
import storeservice from "../service/storeservice";
import noticeservice from "../service/noticeservice";
import productservice from "../service/productservice";
import icon_menu from "../resource/img/icon/icon_menu.svg";
import icon_plus from "../resource/img/icon/icon_plus.svg";

class home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      last: "",
      next: "",
      today: "",
      store: {},
      notices: [],
      products: [],
    };
  }

  componentDidMount() {
    noticeservice.getNotice().then((res) => {
      this.setState({ notices: res.data });
    });
    storeservice
      .getStoreReg(sessionStorage?.getItem("regnumber"))
      .then((res) => {
        this.setState({ store: res.data });
        pushservice
          .tokenRegist(res.data.owner, sessionStorage.getItem("token"))
          .then(() => {
            productservice.getProductStore(res.data.code).then((res) => {
              this.setState({ products: res.data || "" });
            });
            visitservice.getVisitMonth(res.data.code).then((res) => {
              const date = new Date();
              res.data.map((data) => {
                switch (data.month) {
                  case (date.getMonth() >= 13
                    ? date.getMonth() - 12
                    : date.getMonth()
                  ).toString():
                    this.setState({ last: data.count });
                    break;
                  case (date.getMonth() + 1 >= 13
                    ? date.getMonth() - 11
                    : date.getMonth() + 1
                  ).toString():
                    this.setState({ today: data.count });
                    break;
                  case (date.getMonth() + 2 >= 13
                    ? date.getMonth() - 10
                    : date.getMonth() + 2
                  ).toString():
                    this.setState({ next: data.count });
                    break;
                }
              });
            });
          });
      });
  }

  render() {
    const date = new Date();
    return (
      <div className="wrap">
        <main className="main_page">
          <header className="main_title">
            <div className="main_header">
              <div className="menu_icon">
                <a href="#">
                  <img src={icon_menu} alt="메뉴" />
                </a>
              </div>
              <Nav />
              <div className="main_tit">
                <a href="/"> {this.state.store.name}</a>
              </div>
            </div>
            <nav className="main_tab">
              <ul>
                <li>
                  <a href="#visit">공지사항</a>
                </li>
                <li>
                  <a href="#notice">메인/소개글</a>
                </li>
                <li>
                  <a href="#infor">메뉴</a>
                </li>
              </ul>
            </nav>
          </header>
          <section className="main_contents">
            <article className="main_visit" id="visit" name="visit">
              <div className="visit_cont">
                <ul>
                  <li className="visit_tit"></li>
                  <li className="visit_tit">
                    {date.getMonth() >= 13
                      ? date.getMonth() - 12
                      : date.getMonth()}
                    월
                  </li>
                  <li className="visit_tit">
                    {date.getMonth() + 1 >= 13
                      ? date.getMonth() - 11
                      : date.getMonth() + 1}
                    월
                  </li>
                  <li className="visit_tit">
                    {date.getMonth() + 2 >= 13
                      ? date.getMonth() - 10
                      : date.getMonth() + 2}
                    월
                  </li>
                </ul>
                <ul>
                  <li className="visit_tit">방문자</li>
                  <li>{this.state.last || 0}</li>
                  <li>{this.state.today || 0}</li>
                  <li>{this.state.next || 0}</li>
                </ul>
                <ul>
                  <li className="visit_tit">알리미</li>
                  <li>0</li>
                  <li>0</li>
                  <li>0</li>
                </ul>
              </div>
            </article>
            <article className="main_notice" id="notice" name="notice">
              <div className="main_box">
                <header className="sub_title">
                  <div className="sub_tit">
                    <a href="/notice">공지사항</a>
                  </div>
                  <div className="sub_more">
                    <img src={icon_plus} alt="더보기" />
                    <a href="/notice">더 보기</a>
                  </div>
                </header>
                <ul className="notice_cont">
                  {this.state.notices.slice(0, 5).map((notice) => (
                    <li>
                      <p>
                        <a href="/notice">{notice.title}</a>
                      </p>
                      <span>
                        {moment(notice.regdate).format("YYYY-MM-DD HH:mm:ss")}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
            <article className="main_infor" id="infor" name="infor">
              <div className="main_box">
                <header className="sub_title">
                  <div className="sub_tit">
                    <a href="/sub_home">메인/소개글</a>
                  </div>
                  <div className="sub_more">
                    <img src={icon_plus} alt="더보기" />
                    <a href="/sub_home">더 보기</a>
                  </div>
                </header>
                <div className="infor_cont">
                  <div className="infor_tit">
                    <a href="/sub_home">
                      <h2>{this.state.store.explan}</h2>
                    </a>
                  </div>
                  <ul className="infor_img">
                    <li>
                      <a href="/sub_home">
                        <img
                          style={{ width: 100, height: 100 }}
                          src={
                            config.host +
                            `/getStoreImg/${sessionStorage?.getItem(
                              "regnumber"
                            )}`
                          }
                          onError={(event) => {
                            event.target.src = require("../resource/img/icon/no_img.png");
                          }}
                        />
                      </a>
                    </li>
                  </ul>
                  <div className="infor_tit">
                    <a href="/sub_home">{this.state.store.introduce}</a>
                  </div>
                </div>
              </div>
            </article>
            <article className="main_menu">
              <div className="main_box">
                <header className="sub_title">
                  <div className="sub_tit">
                    <a href="/sub_menu">메뉴</a>
                  </div>
                  <div className="sub_more">
                    <img src={icon_plus} alt="더보기" />
                    <a href="/sub_menu">더 보기</a>
                  </div>
                </header>
                <ul className="menu_cont">
                  {this.state.products.slice(0, 2).map((product) => (
                    <li>
                      <div>
                        <a href={`/menu_infor?product=${product.code}`}>
                          <p className="menu_tit">{product.name}</p>
                          <p className="menu_txt">
                            {product.amount}&nbsp;:&nbsp;
                            {product.price.replace(
                              /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                              ","
                            )}
                            &nbsp;원
                          </p>
                        </a>
                      </div>
                      <div className="menu_img">
                        <a href={`/menu_infor?product=${product.code}`}>
                          <img
                            src={config.host + `/getProductImg/${product.code}`}
                            onError={(event) => {
                              event.target.src = require("../resource/img/icon/no_img.png");
                            }}
                          />
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </section>
        </main>
      </div>
    );
  }
}
export default home;
