import React, { Component } from "react";
import scheduleAPI from "../api/scheduleAPI";

export default class AddSchedule extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeStartTime = this.onChangeStartTime.bind(this);
    this.onChangeEndTime = this.onChangeEndTime.bind(this);
    this.saveSchedule = this.saveSchedule.bind(this);
    this.newSchedule = this.newSchedule.bind(this);

    this.state = {
      id: null,
      title: "",
      startTime: "",
      endTime: "",
      published: false,

      submitted: false,
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
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

  saveSchedule() {
    var data = {
      name: this.state.name,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
    };

    scheduleAPI
      .create(data)
      .then((response) => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          startTime: response.data.startTime,
          endTime: response.data.endTime,
          published: response.data.published,

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
      published: false,

      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newSchedule}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="startTime">Start Time</label>
              <input
                type="time"
                className="form-control"
                id="startTime"
                required
                value={this.state.startTime}
                onChange={this.onChangeStartTime}
                name="startTime"
              />
            </div>

            <div className="form-group">
              <label htmlFor="endTime">End Time</label>
              <input
                type="time"
                className="form-control"
                id="endTime"
                required
                value={this.state.endTime}
                onChange={this.onChangeEndTime}
                name="endTime"
              />
            </div>

            <button onClick={this.saveSchedule} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
