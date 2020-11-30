import React, { Component } from "react";
import * as scheduleAPI from "../../api/scheduleAPI";
import Header from "../organisms/Header";
import ScheduleTimetable from "../organisms/ScheduleTimetable";
import ScheduleForm from "../organisms/ScheduleForm";

export default class Schedule extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeShortName = this.onChangeShortName.bind(this);
    this.onChangeStartTime = this.onChangeStartTime.bind(this);
    this.onChangeEndTime = this.onChangeEndTime.bind(this);
    this.onChangeColor = this.onChangeColor.bind(this);
    this.getSchedule = this.getSchedule.bind(this);
    this.updateSchedule = this.updateSchedule.bind(this);
    this.deleteSchedule = this.deleteSchedule.bind(this);

    this.state = {
      currentSchedule: {
        id: null,
        name: "",
        shortName: "",
        startTime: "",
        endTime: "",
        color: "",
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getSchedule(this.props.match.params.id);
    console.log(this.props.match.params.id);
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

  onChangeShortName(e) {
    const shortName = e.target.value;

    this.setState(function (prevState) {
      return {
        currentSchedule: {
          ...prevState.currentSchedule,
          shortName: shortName,
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

  onChangeColor(e) {
    const color = e.hex;

    this.setState((prevState) => ({
      currentSchedule: {
        ...prevState.currentSchedule,
        color: color,
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
      .deleteOne(this.state.currentSchedule.id)
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
        <Header />
        {currentSchedule ? (
          <div className="container">
            <div className="title-text mt-5">Edit Schedule</div>
            <div className="small-text mb-2">
              Schedule will be updated to your routine.
            </div>
            <hr />
            <div className="row">
              <div className="col-7">
                <ScheduleForm
                  name={this.state.currentSchedule.name}
                  onChangeName={this.onChangeName}
                  shortName={this.state.currentSchedule.shortName}
                  onChangeShortName={this.onChangeShortName}
                  startTime={this.state.currentSchedule.startTime}
                  onChangeStartTime={this.onChangeStartTime}
                  endTime={this.state.currentSchedule.endTime}
                  onChangeEndTime={this.onChangeEndTime}
                  color={this.state.currentSchedule.color}
                  onChangeColor={this.onChangeColor}
                  saveSchedule={this.updateSchedule}
                  buttonText="Update"
                />
                <button
                  className="btn btn-outline-primary"
                  onClick={this.deleteSchedule}
                >
                  Delete
                </button>
                <p>{this.state.message}</p>
              </div>
              <div className="col-5 pt-2">
                <ScheduleTimetable />
              </div>
            </div>
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
