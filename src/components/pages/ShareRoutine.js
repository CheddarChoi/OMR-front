import React, { useState, useEffect } from "react";
import { Modal, Button, ButtonGroup, ToggleButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import ShareIcon from "@material-ui/icons/Share";
import * as scheduleAPI from "../../api/scheduleAPI";
import { PieChart } from "react-minimal-pie-chart";
import { time2dec } from "../../utils/time";
import Header from "../organisms/Header";
import * as loginAPI from "../../api/loginAPI";

const ShareRoutine = () => {
  // const router = useRouter();
  const [publicUsers, setPublicUsers] = useState([]);

  useEffect(() => {
    loginAPI.getAllPublicUsers().then((response) => {
      console.log(response.data);
      setPublicUsers(response.data);
    });
  }, []);

  const charts = publicUsers.map((user) => {
    console.log(user.Schedules);
    const schedules = user.Schedules;
    if (schedules) {
      let time = 0;
      let chartData = [];
      let currTime = 0;
      schedules
        .sort((a, b) => time2dec(a.startTime) - time2dec(b.startTime))
        .map((schedule) => {
          time = time2dec(schedule.startTime);
          console.log(time2dec(schedule.startTime));
          if (currTime !== time) {
            let newPaddingData = {
              title: "",
              value: time - currTime,
              color: "#eeeeee",
            };
            chartData.push(newPaddingData);
          }
          let newChartData = {
            title: schedule.name,
            value: time2dec(schedule.endTime) - time,
            color: schedule.color,
          };
          chartData.push(newChartData);
          currTime = time2dec(schedule.endTime);
        });
      if (currTime !== time2dec("00:00:00")) {
        let newPaddingData = {
          title: "",
          value: time2dec("24:00:00") - currTime,
          color: "#eeeeee",
        };
        chartData.push(newPaddingData);
      }
      console.log(chartData);
      return (
        <div className="col-4">
          <PieChart
            data={chartData}
            startAngle={270}
            totalValue={24}
            lineWidth={30}
            style={{ position: "relative" }}
            // rounded
            label={({ dataEntry }) => dataEntry.title}
            labelStyle={(index) => ({
              fill: chartData[index].color,
              fontSize: "0.2rem",
              fontFamily: "NanumSquare",
            })}
            radius={40}
            labelPosition={108}
          />
          <div
            className="title-text"
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: "0",
              right: "0",
              top: "45%",
              bottom: "0",
              textAlign: "center",
            }}
          >
            {user.name}
          </div>
          <div className="divider" />
        </div>
      );
    }
  });

  return (
    <div>
      <Header />
      <div className="container">
        <div className="title-text mt-5">Share Routine</div>
        <div className="body-text mb-2">
          Check your friends' routine and Find out something new.
        </div>
        <hr />
        <div className="row">{charts}</div>
      </div>
    </div>
  );
};

export default ShareRoutine;
