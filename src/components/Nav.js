import React from "react";
import icon_close from "../resource/img/icon/icon_close.svg";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // 메뉴 열기
    const open = document.querySelector(".menu_icon > a");
    const category = document.querySelector(".menu_nav");
    const close = document.querySelector(".close");
    const menu = document.querySelectorAll(".menu_nav_box > ul > li");
    open.addEventListener("click", () => {
      category.style.left = "0";
      category.style.transition = "1s";
    });
    close.addEventListener("click", () => {
      category.style.left = "-200%";
    });
    for (let i = 0; i < menu.length; i++) {
      (function (i) {
        menu[i].onclick = function () {
          menu[i].classList.add("nav_active");
        };
        menu[i].classList.remove("nav_active");
      })(i);
    }
  }

  render() {
    return (
      <div className="menu_nav">
        <div className="menu_nav_box">
          <div className="close">
            <a href="#">
              <img src={icon_close} alt="닫기" />
            </a>
          </div>
          <ul>
            <li>
              <a href="/sub_home">메인·소개글</a>
            </li>
            <li className="nav_active">
              <a href="/sub_menu">메뉴</a>
            </li>
            <li>
              <a href="/mypage">마이페이지</a>
            </li>
            <li>
              <a href="/inquiry">문의하기</a>
            </li>
            {sessionStorage?.getItem("regnumber") ? (
              <li>
                <a
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    sessionStorage.clear();
                    window.location.href = "/";
                  }}
                >
                  로그아웃
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    );
  }
}
export default Nav;
