import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";
import logo from "../../Logo.png";
import * as loginAPI from "../../api/loginAPI";

import getServerSideProps from "../../utils/checkAuth";
export { getServerSideProps };

const AdminLoginPage = ({ history }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modal, setModal] = useState("");

  const handleClose = () => setShowModal(false);

  const tryLogin = (e) => {
    console.log("try login");
    e.preventDefault();
    loginAPI
      .login({ username, password })
      .then((res) => {
        history.push("/");
        console.log("success!");
      })
      .catch((err) => {
        setShowModal(true);
        setModal(err.response.data);
      });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        // backgroundColor: "#eee",
      }}
      className="d-flex align-items-center"
    >
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Body>{modal}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="d-flex login-content">
        <div className="flex-grow-1 login-module d-flex flex-column">
          <Link to={"/home"}>
            <a className="d-flex justify-content-center">
              <img
                alt=""
                src={logo}
                width="auto"
                height="40"
                className="d-inline-block align-top mb-3 align-center"
              />
            </a>
          </Link>
          <Form className="login-form" onSubmit={tryLogin}>
            <Form.Group>
              <Form.Label className="body-text">Username</Form.Label>
              <Form.Control
                className="body-text"
                type="text"
                onChange={(value) => setUsername(value.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="body-text">Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(value) => setPassword(value.target.value)}
              />
            </Form.Group>
            <Button type="submit" className="login-button" variant="primary">
              Login
            </Button>
            <Form.Text className="text-muted">
              New to OMR? <Link to={"/register"}>Register</Link>
            </Form.Text>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
