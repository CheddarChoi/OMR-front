import React, { Component } from "react";
import scheduleAPI from "../api/scheduleAPI";

export default class AddSchedule extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeTime = this.onChangeTime.bind(this);
    this.saveSchedule = this.saveSchedule.bind(this);
    this.newSchedule = this.newSchedule.bind(this);

    this.state = {
      id: null,
      title: "",
      time: "",
      published: false,

      submitted: false,
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeTime(e) {
    this.setState({
      time: e.target.value,
    });
  }

  saveSchedule() {
    var data = {
      name: this.state.name,
      time: this.state.time,
    };

    scheduleAPI
      .create(data)
      .then((response) => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          time: response.data.time,
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
      time: "",
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
              <label htmlFor="time">Time</label>
              <input
                type="text"
                className="form-control"
                id="time"
                required
                value={this.state.time}
                onChange={this.onChangeTime}
                name="time"
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
