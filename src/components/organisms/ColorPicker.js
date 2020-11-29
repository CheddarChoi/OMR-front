import React, { Component } from "react";
import { TwitterPicker } from "react-color";

export default class ColorPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayColorPicker: false,
    };
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  render() {
    const { color, onChangeColor } = this.props;

    return (
      <div>
        <div>
          <div
            style={{
              padding: "5px",
              background: "#fff",
              borderRadius: "1px",
              boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
              display: "inline-block",
              cursor: "pointer",
              marginRight: "0.5rem",
            }}
            onClick={this.handleClick}
          >
            <div
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "2px",
                background: `${color}`,
              }}
            />
          </div>
          {this.state.displayColorPicker ? (
            <div
              style={{
                position: "absolute",
                zIndex: "2",
              }}
            >
              <div
                style={{
                  position: "fixed",
                  top: "0px",
                  right: "0px",
                  bottom: "0px",
                  left: "0px",
                }}
                onClick={this.handleClose}
              />
              <TwitterPicker color={color} onChange={onChangeColor} />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
