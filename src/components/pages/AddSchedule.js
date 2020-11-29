import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import * as scheduleAPI from "../../api/scheduleAPI";
import ScheduleForm from "../organisms/ScheduleForm";
import Header from "../organisms/Header";
import ScheduleTimetable from "../organisms/ScheduleTimetable";

export default class AddSchedule extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeShortName = this.onChangeShortName.bind(this);
    this.onChangeStartTime = this.onChangeStartTime.bind(this);
    this.onChangeEndTime = this.onChangeEndTime.bind(this);
    this.onChangeColor = this.onChangeColor.bind(this);
    this.saveSchedule = this.saveSchedule.bind(this);
    this.newSchedule = this.newSchedule.bind(this);

    this.state = {
      id: null,
      title: "",
      startTime: "",
      endTime: "",
      submitted: false,
      color: "#563e2e",
      shortName: "",
      showModal: false,
      modal: "",
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeShortName(e) {
    this.setState({
      shortName: e.target.value,
    });
  }

  onChangeStartTime(e) {
    this.setState({
      startTime: e.target.value,
    });
  }

  onChangeEndTime(e) {
    this.setState({
      endTime: e.target.value,
    });
  }

  onChangeColor = (color) => {
    console.log(color.hex);
    this.setState({ color: color.hex });
  };

  handleClose = () => {
    this.setState({ showModal: false });
  };

  saveSchedule() {
    if (!this.state.name && !/^\s+$/.test(this.state.name)) return;
    if (!this.state.startTime) return;
    if (!this.state.endTime) return;
    if (!this.state.shortName && !/^\s+$/.test(this.state.shortName)) return;

    var data = {
      name: this.state.name,
      shortName: this.state.shortName,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      color: this.state.color,
    };

    console.log(data);

    scheduleAPI
      .create(data)
      .then((response) => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          shortName: response.data.shortName,
          startTime: response.data.startTime,
          endTime: response.data.endTime,
          color: response.data.color,
          submitted: true,
        });
        console.log(response.data);
      })
      .catch((e) => {
        if (e.response.status === 400) {
          this.setState({ showModal: true, modal: e.response.data });
        }
        console.log(e);
      });
  }

  newSchedule() {
    this.setState({
      id: null,
      name: "",
      startTime: "",
      endTime: "",
      submitted: false,
    });
  }

  render() {
    return (
      <div>
        <Header />
        <Modal centered show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Body className="subtitle-text">{this.state.modal}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
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
                {this.state.submitted ? (
                  <div>
                    <h4>You submitted successfully!</h4>
                    <button
                      className="btn btn-success"
                      onClick={this.newSchedule}
                    >
                      Add
                    </button>
                  </div>
                ) : (
                  <ScheduleForm
                    name={this.state.name}
                    onChangeName={this.onChangeName}
                    shortName={this.state.shortName}
                    onChangeShortName={this.onChangeShortName}
                    startTime={this.state.startTime}
                    onChangeStartTime={this.onChangeStartTime}
                    endTime={this.state.endTime}
                    onChangeEndTime={this.onChangeEndTime}
                    color={this.state.color}
                    onChangeColor={this.onChangeColor}
                    saveSchedule={this.saveSchedule}
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
  }
}
