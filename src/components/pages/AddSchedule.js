import React, { Component } from "react";
import * as scheduleAPI from "../../api/scheduleAPI";
import ScheduleForm from "../organisms/ScheduleForm";
import Header from "../organisms/Header";

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

  saveSchedule() {
    console.log(this.state.color.hex);
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
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newSchedule}>
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
    );
  }
}
