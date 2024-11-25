import React from "react";
import storeservice from "../service/storeservice";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      store: {},
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
      <div className="main_tit">
        <a href="/"> {this.state.store.name}</a>
      </div>
    );
  }
}
export default Header;
