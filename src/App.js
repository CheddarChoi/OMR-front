import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.scss";

import ScheduleList from "./components/pages/ListSchedule";
import ScheduleChart from "./components/pages/ScheduleChart";
import Add from "./components/pages/Add";
import Schedule from "./components/pages/ScheduleDetail";
import Login from "./components/pages/Login";
import Home from "./components/pages/Home";
import Register from "./components/pages/Register";
import ShareRoutine from "./components/pages/ShareRoutine";
import ScheduleTimetable from "./components/organisms/ScheduleTimetable";

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path={["/", "/home"]} component={Home} />
        <Route exact path="/chart" component={ScheduleChart} />
        <Route exact path="/schedules" component={ScheduleList} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/add" component={Add} />
        <Route exact path="/share" component={ShareRoutine} />
        <Route exact path="/timetable" component={ScheduleTimetable} />
        <Route path="/schedules/:id" component={Schedule} />
      </Switch>
    </div>
  );
};

export default App;
