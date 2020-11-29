import React, { useState, useEffect } from "react";
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../Logo.png";
import * as loginAPI from "../../api/loginAPI";
import getServerSideProps from "../../utils/checkAuth";

const Header = () => {
  const [props, setProps] = useState({});
  const [authButtonBar, setAuthButtonBar] = useState(<div />);
  const [name, setName] = useState(props.name || "NoName");

  const tryLogout = () => {
    loginAPI.logout().then((res) => window.location.reload());
  };

  useEffect(() => {
    getServerSideProps().then((res) => {
      console.log(res.props);
      setProps(res.props);
    });
  }, []);

  useEffect(() => {
    if (props) setName(props.name || "NoName");
  }, [props]);

  useEffect(() => {
    if (props.name)
      setAuthButtonBar(
        <div className="d-flex ml-auto">
          <NavDropdown
            alignRight
            title={name}
            id="user-name"
            className="body-text"
          >
            <Link onClick={tryLogout} className="nav-link">
              Logout
            </Link>
          </NavDropdown>
        </div>
      );
    else
      setAuthButtonBar(
        <div className="d-flex ml-auto">
          <Nav>
            <Link to={"/login"} className="nav-link">
              Login
            </Link>
          </Nav>
          <Nav>
            <Link to={"/register"} className="nav-link">
              Register
            </Link>
          </Nav>
        </div>
      );
  }, [name]);

  return (
    <div
      className="mb-3"
      style={{
        fontFamily: "Nanum Gothic",
      }}
    >
      <Navbar as={Container} collapseOnSelect expand="lg">
        <Navbar.Brand href="/home">
          <img
            alt=""
            src={logo}
            width="auto"
            height="36"
            className="d-inline-block align-top mr-5"
          />{" "}
        </Navbar.Brand>
        <div className="navbar-nav mr-auto">
          <li className="nav-item custom-nav-item">
            <Link to={"/chart"} className="nav-link">
              My Routine
            </Link>
          </li>
          <li className="nav-item custom-nav-item">
            <Link to={"/share"} className="nav-link">
              Share
            </Link>
          </li>
        </div>
        <div className="navbar-nav ml-auto">{authButtonBar}</div>
      </Navbar>
      <div style={{ height: "1px", backgroundColor: "#ddd" }} />
    </div>
  );
};

export default Header;
