import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";
import * as loginAPI from "../../api/loginAPI";
import logo from "../../Logo.png";

import getServerSideProps from "../../utils/checkAuth";
export { getServerSideProps };

const Register = ({ history }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [modal, setModal] = useState("");

  const handleClose = () => setShowModal(false);

  const tryRegister = (e) => {
    e.preventDefault();
    loginAPI
      .register({ name, username, password })
      .then((res) => {
        history.push("/login");
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
          <Link to="/home">
            <a className="align-self-center login-logo">
              <img
                alt=""
                src={logo}
                width="auto"
                height="40"
                className="d-inline-block align-top"
              />
            </a>
          </Link>
          <Form className="login-form" onSubmit={tryRegister}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                onChange={(value) => setName(value.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                onChange={(value) => setUsername(value.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(value) => setPassword(value.target.value)}
              />
            </Form.Group>
            <Button
              disabled={!(name && username && password)}
              type="submit"
              className="login-button"
              variant="primary"
            >
              Register
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
