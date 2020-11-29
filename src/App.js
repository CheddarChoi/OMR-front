import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./components/organisms/Header";
import "./App.scss";

import ScheduleList from "./components/pages/ListSchedule";
import ScheduleChart from "./components/pages/ScheduleChart";
import AddSchedule from "./components/pages/AddSchedule";
import Schedule from "./components/pages/ScheduleDetail";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import ScheduleTimetable from "./components/organisms/ScheduleTimetable";

const App = () => {
  return (
    <div>
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
        <Route exact path="/timetable" component={ScheduleTimetable} />
        <Route path="/schedules/:id" component={Schedule} />
      </Switch>
    </div>
  );
};

export default App;
