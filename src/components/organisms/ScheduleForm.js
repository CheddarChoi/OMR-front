import React, { Component } from "react";
import ColorPicker from "./ColorPicker";

export default class AddSchedule extends Component {
  render() {
    const {
      name,
      onChangeName,
      shortName,
      onChangeShortName,
      startTime,
      onChangeStartTime,
      endTime,
      onChangeEndTime,
      color,
      onChangeColor,
      saveSchedule,
    } = this.props;

    return (
      <div>
        <div className="form-group">
          <label className="subtitle-text" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            className="form-control body-text"
            id="name"
            required
            value={name}
            onChange={onChangeName}
            name="name"
            placeholder="Enter the name of the schedule"
          />
        </div>
        <div className="form-group">
          <label className="subtitle-text" htmlFor="startTime">
            Start Time
          </label>
          <input
            type="time"
            className="form-control body-text"
            id="startTime"
            required
            value={startTime}
            onChange={onChangeStartTime}
            name="startTime"
          />
        </div>
        <div className="form-group">
          <label className="subtitle-text" htmlFor="endTime">
            End Time
          </label>
          <input
            type="time"
            className="form-control body-text"
            id="endTime"
            required
            value={endTime}
            onChange={onChangeEndTime}
            name="endTime"
          />
        </div>
        <div>
          <label className="subtitle-text">Label</label>
          <ColorPicker color={color} onChangeColor={onChangeColor} />
          <input
            type="text"
            className="form-control body-text"
            id="shortName"
            required
            value={shortName}
            onChange={onChangeShortName}
            name="shortName"
            placeholder="Enter short name of schedule"
          />
        </div>
        <button onClick={saveSchedule} className="btn btn-primary mt-4">
          Submit
        </button>
      </div>
    );
  }
}
