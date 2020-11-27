import React, { Component } from "react";
import scheduleAPI from "../../api/scheduleAPI";

export default class Schedule extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeStartTime = this.onChangeStartTime.bind(this);
    this.onChangeEndTime = this.onChangeEndTime.bind(this);
    this.getSchedule = this.getSchedule.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateSchedule = this.updateSchedule.bind(this);
    this.deleteSchedule = this.deleteSchedule.bind(this);

    this.state = {
      currentSchedule: {
        id: null,
        name: "",
        startTime: "",
        endTime: "",
        published: false,
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getSchedule(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function (prevState) {
      return {
        currentSchedule: {
          ...prevState.currentSchedule,
          name: name,
        },
      };
    });
  }

  onChangeStartTime(e) {
    const startTime = e.target.value;

    this.setState((prevState) => ({
      currentSchedule: {
        ...prevState.currentSchedule,
        startTime: startTime,
      },
    }));
  }

  onChangeEndTime(e) {
    const endTime = e.target.value;

    this.setState((prevState) => ({
      currentSchedule: {
        ...prevState.currentSchedule,
        endTime: endTime,
      },
    }));
  }

  getSchedule(id) {
    scheduleAPI
      .get(id)
      .then((response) => {
        this.setState({
          currentSchedule: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentSchedule.id,
      name: this.state.currentSchedule.name,
      startTime: this.state.currentSchedule.startTime,
      endTime: this.state.currentSchedule.endTime,
      published: status,
    };

    scheduleAPI
      .update(this.state.currentSchedule.id, data)
      .then((response) => {
        this.setState((prevState) => ({
          currentSchedule: {
            ...prevState.currentSchedule,
            published: status,
          },
        }));
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateSchedule() {
    scheduleAPI
      .update(this.state.currentSchedule.id, this.state.currentSchedule)
      .then((response) => {
        console.log(response.data);
        this.setState({
          message: "The schedule was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteSchedule() {
    scheduleAPI
      .delete(this.state.currentSchedule.id)
      .then((response) => {
        console.log(response.data);
        this.props.history.push("/schedules");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentSchedule } = this.state;

    return (
      <div>
        {currentSchedule ? (
          <div className="edit-form">
            <h4>Schedule</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="time"
                  className="form-control"
                  id="name"
                  value={currentSchedule.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="startTime">Start Time</label>
                <input
                  type="text"
                  className="form-control"
                  id="startTime"
                  value={currentSchedule.startTime}
                  onChange={this.onChangeStartTime}
                />
              </div>
              <div className="form-group">
                <label htmlFor="endTime">End Time</label>
                <input
                  type="time"
                  className="form-control"
                  id="endTime"
                  value={currentSchedule.endTime}
                  onChange={this.onChangeEndTime}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentSchedule.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentSchedule.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteSchedule}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateSchedule}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Schedule...</p>
          </div>
        )}
      </div>
    );
  }
}
