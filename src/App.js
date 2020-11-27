import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { Navbar, Container } from "react-bootstrap";
import "./App.scss";

import ScheduleList from "./components/pages/ListSchedule";
import ScheduleChart from "./components/pages/ScheduleChart";
import AddSchedule from "./components/pages/AddSchedule";
import Schedule from "./components/pages/ScheduleDetail";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";

import logo from "./Logo.png";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar as={Container} collapseOnSelect expand="lg">
          <Navbar.Brand href="/home">
            <img
              alt=""
              src={logo}
              width="auto"
              height="40"
              className="d-inline-block align-top"
            />{" "}
          </Navbar.Brand>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/schedules"} className="nav-link">
                Schedules
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/chart"} className="nav-link">
                Chart
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>
          </div>
        </Navbar>
        <div style={{ height: "1px", backgroundColor: "#ddd" }} />

        <div className="container mt-3">
          <Switch>
            <Route
              exact
              path={["/", "/home", "/schedules"]}
              component={ScheduleList}
            />
            <Route exact path="/chart" component={ScheduleChart} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/add" component={AddSchedule} />
            <Route path="/schedules/:id" component={Schedule} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
