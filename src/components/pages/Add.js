import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import * as scheduleAPI from "../../api/scheduleAPI";
import ScheduleForm from "../organisms/ScheduleForm";
import Header from "../organisms/Header";
import ScheduleTimetable from "../organisms/ScheduleTimetable";

const Add = () => {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [shortName, setShortName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [color, setColor] = useState("#563e2e");
  const [showModal, setShowModal] = useState(false);
  const [modal, setModal] = useState("#");

  const onChangeName = (e) => {
    setTitle(e.target.value);
  };

  const onChangeShortName = (e) => {
    setShortName(e.target.value);
  };

  const onChangeStartTime = (e) => {
    setStartTime(e.target.value);
  };

  const onChangeEndTime = (e) => {
    setEndTime(e.target.value);
  };

  const onChangeColor = (color) => {
    setColor(color.hex);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const saveSchedule = () => {
    if (!title && !/^\s+$/.test(title)) return;
    if (!startTime) return;
    if (!endTime) return;
    if (!shortName && !/^\s+$/.test(shortName)) return;

    var data = {
      name: title,
      shortName: shortName,
      startTime: startTime,
      endTime: endTime,
      color: color,
    };

    scheduleAPI
      .create(data)
      .then((response) => {
        setId(response.data.id);
        setTitle(response.data.name);
        setShortName(response.data.shortName);
        setStartTime(response.data.startTime);
        setEndTime(response.data.endTime);
        setColor(response.data.color);
        setSubmitted("true");
      })
      .catch((e) => {
        console.log("here");
        setModal(e.response.data);
        setShowModal(true);
      });
  };

  const newSchedule = () => {
    console.log("new");
    window.location.reload();
  };

  return (
    <div>
      <Header />
      <Modal centered show={showModal} onHide={handleClose}>
        <Modal.Body className="subtitle-text">{modal}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="container">
        <div className="title-text mt-5">Add Schedule</div>
        <div className="small-text mb-2">
          New schedule will be added to your routine.
        </div>
        <hr />
        <div className="row">
          <div className="col-7">
            <div className="pr-2">
              {submitted ? (
                <div>
                  <h4>You submitted successfully!</h4>
                  <button className="btn btn-success" onClick={newSchedule}>
                    Add
                  </button>
                </div>
              ) : (
                <ScheduleForm
                  name={title}
                  onChangeName={onChangeName}
                  shortName={shortName}
                  onChangeShortName={onChangeShortName}
                  startTime={startTime}
                  onChangeStartTime={onChangeStartTime}
                  endTime={endTime}
                  onChangeEndTime={onChangeEndTime}
                  color={color}
                  onChangeColor={onChangeColor}
                  saveSchedule={saveSchedule}
                  buttonText="Submit"
                />
              )}
            </div>
          </div>
          <div className="col-5 pt-2">
            <ScheduleTimetable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
