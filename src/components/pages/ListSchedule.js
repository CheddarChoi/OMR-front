import React, { Component } from "react";
import * as scheduleAPI from "../../api/scheduleAPI";
import { Link } from "react-router-dom";
import { time2dec, time2hm } from "../../utils/time";
import Header from "../organisms/Header";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

export default class ScheduleList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveSchedule = this.retrieveSchedule.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveSchedule = this.setActiveSchedule.bind(this);
    this.removeAllSchedule = this.removeAllSchedule.bind(this);
    this.searchName = this.searchName.bind(this);
    this.isDark = this.isDark.bind(this);

    this.state = {
      schedules: [],
      currentSchedule: null,
      currentIndex: -1,
      searchName: "",
    };
  }

  isDark(colorCode) {
    const red = parseInt(colorCode.slice(1, 3), 16);
    const green = parseInt(colorCode.slice(3, 5), 16);
    const blue = parseInt(colorCode.slice(5, 7), 16);
    console.log(red * 0.299 + green * 0.587 + blue * 0.114);
    if (red * 0.299 + green * 0.587 + blue * 0.114 < 186) return true;
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

  deleteSchedule(id) {
    scheduleAPI
      .deleteOne(id)
      .then((response) => {
        console.log(response.data);
        this.props.history.push("/schedules");
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
      <div>
        <Header />
        <div className="container">
          <div className="title-text mt-5">Edit Schedule</div>
          <div className="small-text mb-2">Search and Edit your schedules.</div>
          <hr />
          <div>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control subtitle-text"
                placeholder="Search by Name"
                value={searchName}
                onChange={this.onChangeSearchName}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-primary subtitle-text"
                  type="button"
                  onClick={this.searchName}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-5">
              <ul className="list-group">
                {schedules &&
                  schedules
                    .sort(
                      (a, b) => time2dec(a.startTime) - time2dec(b.startTime)
                    )
                    .map((schedule, index) => (
                      <li
                        className={"list-group-item"}
                        style={{
                          backgroundColor:
                            index === currentIndex
                              ? `${currentSchedule.color}`
                              : "#ffffff",
                          color:
                            index === currentIndex &&
                            this.isDark(currentSchedule.color)
                              ? "#ffffff"
                              : "#000000",
                        }}
                        onClick={() => this.setActiveSchedule(schedule, index)}
                        key={index}
                      >
                        <div className="small-text">
                          {time2hm(schedule.startTime)} -{" "}
                          {time2hm(schedule.endTime)}{" "}
                        </div>
                        <div className="subtitle-text">{schedule.name}</div>
                      </li>
                    ))}
              </ul>

              <button
                className="mt-3 btn btn-sm btn-danger"
                onClick={this.removeAllSchedule}
              >
                Remove All
              </button>
            </div>
            <div className="col-7">
              {currentSchedule ? (
                <div>
                  <div className="subtitle-text">{currentSchedule.name}</div>
                  <hr className="my-1" />
                  <div className="mt-2 body-text">
                    <label>
                      <strong>Start Time:</strong>
                    </label>{" "}
                    {currentSchedule.startTime}
                  </div>
                  <div className="body-text">
                    <label>
                      <strong>End Time:</strong>
                    </label>{" "}
                    {currentSchedule.endTime}
                  </div>
                  <div className="body-text">
                    <label>
                      <strong>Label:</strong>
                    </label>{" "}
                    {currentSchedule.shortName}
                  </div>
                  <Link to={"/schedules/" + currentSchedule.id}>
                    <EditIcon />
                  </Link>
                  <button
                    className="btn"
                    style={{ color: "#563E2E" }}
                    onClick={() => this.deleteSchedule(currentSchedule.id)}
                  >
                    <DeleteIcon />
                  </button>
                </div>
              ) : (
                <div>
                  <div className="subtitle-text">
                    Click on a Schedule to see the detail.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
