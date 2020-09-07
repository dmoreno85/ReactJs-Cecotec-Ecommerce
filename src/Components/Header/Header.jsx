import React from "react";
import "./Header.scss";
import styles from "../../styles.scss";
import { NavLink } from "react-router-dom";
import Logout from "../Logout/Logout";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bgColorOne: true,
      bgColorTwo: false,
      bg: styles.bgmenu,
    };
  }

  handleStyleOne() {
    if (!this.state.bgColorOne) {
      this.setState({
        bgColorOne: true,
        bgColorTwo: false,
      });
    }
  }
  handleStyleTwo() {
    if (!this.state.bgColorTwo) {
      this.setState({
        bgColorTwo: true,
        bgColorOne: false,
      });
    }
  }

  render() {
    return (
      <header className="header">
        <React.Fragment>
          <div className="menuHeader">
            <NavLink
              to="/clients"
              onClick={() => this.handleStyleOne()}
              className="userClientsList"
              style={{
                backgroundColor: this.state.bgColorOne ? this.state.bg : null,
              }}
            >
              <span>Clientes</span>
            </NavLink>
            <NavLink
              to="/products"
              onClick={() => this.handleStyleTwo()}
              className="productsList"
              style={{
                backgroundColor: this.state.bgColorTwo ? this.state.bg : null,
              }}
            >
              <span className="productsList">Productos</span>
            </NavLink>
          </div>
          <Logout />
        </React.Fragment>
      </header>
    );
  }
}

export default Header;
