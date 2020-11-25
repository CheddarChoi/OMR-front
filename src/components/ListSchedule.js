import React, { Component } from "react";
import scheduleAPI from "../api/scheduleAPI";
import { Link } from "react-router-dom";

export default class ScheduleList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveSchedule = this.retrieveSchedule.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveSchedule = this.setActiveSchedule.bind(this);
    this.removeAllSchedule = this.removeAllSchedule.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      schedules: [],
      currentSchedule: null,
      currentIndex: -1,
      searchName: "",
    };
  }

  componentDidMount() {
    this.retrieveSchedule();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName,
    });
  }

  retrieveSchedule() {
    scheduleAPI
      .getAll()
      .then((response) => {
        console.log(response.data);
        this.setState({
          schedules: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveSchedule();
    this.setState({
      currentSchedule: null,
      currentIndex: -1,
    });
  }

  setActiveSchedule(schedule, index) {
    this.setState({
      currentSchedule: schedule,
      currentIndex: index,
    });
  }

  removeAllSchedule() {
    scheduleAPI
      .deleteAll()
      .then((response) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  searchName() {
    scheduleAPI
      .findByName(this.state.searchName)
      .then((response) => {
        this.setState({
          schedules: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { searchName, schedules, currentSchedule, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Name"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Schedules List</h4>

          <ul className="list-group">
            {schedules &&
              schedules.map((schedule, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveSchedule(schedule, index)}
                  key={index}
                >
                  {schedule.name}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllSchedule}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentSchedule ? (
            <div>
              <h4>Schedule</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentSchedule.name}
              </div>
              <div>
                <label>
                  <strong>Start Time:</strong>
                </label>{" "}
                {currentSchedule.startTime}
              </div>
              <div>
                <label>
                  <strong>End Time:</strong>
                </label>{" "}
                {currentSchedule.endTime}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentSchedule.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/schedules/" + currentSchedule.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Schedule...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
