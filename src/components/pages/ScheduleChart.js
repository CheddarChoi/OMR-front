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

const ScheduleChart = () => {
  // const router = useRouter();
  const [schedules, setSchedules] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [timeSum, setTimeSum] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [publicity, setPublicity] = useState("private");

  const radios = [{ value: "private" }, { value: "public" }];

  useEffect(() => {
    scheduleAPI
      .getAll()
      .then((response) => {
        setSchedules(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    loginAPI.getPublicity().then((response) => {
      if (response.data) setPublicity("public");
      else setPublicity("private");
    });
  }, []);

  useEffect(() => {
    let chartData = [];
    let currTime = 0;
    let time = 0;
    let sum = 0;
    if (schedules) {
      schedules
        .sort((a, b) => time2dec(a.startTime) - time2dec(b.startTime))
        .map((schedule) => {
          time = time2dec(schedule.startTime);
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
          sum += time2dec(schedule.endTime) - time;
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
      setChartData(chartData);
      setTimeSum(sum);
    }
  }, [schedules]);

  const submitPublicity = async () => {
    console.log(publicity);
    if (publicity === "public")
      loginAPI.changePublic().then(setShowModal(false));
    else loginAPI.changePrivate().then(setShowModal(false));
  };

  return (
    <div>
      <Header />
      <Modal centered show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="title-text">Share Routine</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="subtitle-text mb-2">
            You can share your routine to all of OMR users.
          </div>
          <ButtonGroup toggle>
            {radios.map((radio, idx) => (
              <ToggleButton
                className="subtitle-text"
                key={idx}
                type="radio"
                variant="primary"
                name="radio"
                value={radio.value}
                checked={publicity === radio.value}
                onChange={(e) => {
                  console.log("change to " + e.currentTarget.value);
                  setPublicity(e.currentTarget.value);
                }}
              >
                {radio.value}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={submitPublicity}>Set</Button>
        </Modal.Footer>
      </Modal>
      <div className="container">
        <div className="title-text mt-5">My Routine</div>
        <div className="body-text mb-2">
          Check your routine pie chart and Discover your life pattern.
        </div>
        <hr />
        <div className="row">
          <div className="col-7">
            <PieChart
              data={chartData}
              startAngle={270}
              totalValue={24}
              lineWidth={30}
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
          </div>
          <div className="col-5">
            <div className="d-flex flex-row-reverse mb-5">
              <Link to="/schedules" className="btn btn-outline-primary ml-2">
                <EditIcon />
              </Link>
              <Link to="/add" className="btn btn-outline-primary ml-2">
                <AddIcon />
              </Link>
              <button
                className="btn btn-outline-primary"
                style={{ color: "#563E2E" }}
                onClick={() => setShowModal(true)}
              >
                <ShareIcon />
              </button>
            </div>
            <div
              className="subtitle-text mb-2 mt-2"
              style={{ color: "#563E2E", fontWeight: "800" }}
            >
              Insights
            </div>
            <div className="subtitle-text">
              You've completed {timeSum | 0}/24 hours of your day.
            </div>
            {timeSum < 23 ? (
              <div className="body-text mb-2">
                Keep recording your daily life and Share with your friends.
              </div>
            ) : (
              <div className="body-text mb-2">
                You've almost complete your routine! Let's share it with your
                friend.
              </div>
            )}
            <div className="subtitle-text">
              You have {schedules.length} schedules in your routine.
            </div>
            <div className="body-text mb-2">
              Keep your routine well-organized.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleChart;
