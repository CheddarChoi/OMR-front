import React, { useEffect, useState } from "react";

import logo from "../../Logo.png";

import getServerSideProps from "../../utils/checkAuth";

const Home = ({ history }) => {
  const buttonStyle = {
    fontSize: "20px",
    fontWeight: "600",
    fontFamily: "NanumSquare",
  };

  const [props, setProps] = useState([]);

  useEffect(() => {
    getServerSideProps().then((res) => {
      console.log(res.props);
      setProps(res.props);
    });
  }, []);

  useEffect(() => {
    if (props.name) history.push("/chart");
  }, [props]);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#ffffff",
      }}
      className="d-flex flex-column justify-content-center align-items-center"
    >
      <img src={logo} style={{ width: "8%" }} className="mb-3" />
      <div className="title-text" style={{ color: "563E2E" }}>
        Oh My Routine
      </div>
      <div className="subtitle-text" style={{ color: "563E2E" }}>
        Manage and Share Your Routine
        <hr />
      </div>
      <div
        className="d-flex justify-content-between mt-2"
        style={{ width: "260px" }}
      >
        <button
          className="btn btn-primary"
          style={{ width: "120px" }}
          onClick={() => history.push("/login")}
        >
          <span style={buttonStyle}>Login</span>
        </button>
        <button
          className="btn btn-outline-primary"
          style={{ width: "120px" }}
          onClick={() => history.push("/register")}
        >
          <span style={buttonStyle}>Register</span>
        </button>
      </div>
    </div>
  );
};

export default Home;
