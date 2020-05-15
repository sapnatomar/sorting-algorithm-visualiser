import React, { Component } from "react";
import "./Visualizer.css";

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export class Visualizer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      size: 100,
      min_value: 1,
      max_value: 500,
    };
  }

  componentDidMount() {
    this.generateArray();
  }

  //   setMinvalue = (e) => {
  //     this.setState({
  //       min_value: e.target.value,
  //     });

  //     this.generateArray();
  //   };

  //   setMaxValue = (e) => {
  //     this.setState({
  //       max_value: e.target.value,
  //     });

  //     this.generateArray();
  //   };

  setArraySize = (e) => {
    this.setState({
      size: e.target.value,
    });

    this.generateArray();
  };

  generateArray = () => {
    const array = [];
    const { size, min_value, max_value } = this.state;

    for (let i = 1; i <= size; i++) {
      array.push(randomIntFromInterval(min_value, max_value));
    }
    this.setState({ array });
  };

  render() {
    const { array, size, min_value, max_value } = this.state;

    return (
      <div className="visualizer">
        <div className="actions">
          <div>
            <label name="size">Size of Array: </label> <br />
            <input
              type="range"
              name="array_size"
              className="size-slider"
              min="5"
              max="400"
              step="1"
              value={size}
              onChange={this.setArraySize}
            ></input>
          </div>

          {/* <div>
            <label name="min_value">Min value of elements: </label> <br />
            <input
              type="range"
              name="array_min_value"
              className="min-value-slider"
              min="1"
              max="200"
              step="1"
              value={min_value}
              onChange={this.setMinvalue}
            ></input>
          </div>

          <div>
            <label name="max_value">Max value of elements: </label> <br />
            <input
              type="range"
              name="array_max_value"
              className="max-value-slider"
              min="201"
              max="500"
              step="1"
              value={max_value}
              onChange={this.setMaxValue}
            ></input>
          </div> */}

          <div>
            <button>Sort</button>
          </div>
        </div>

        <div className="array-container">
          {array.map((value, index) => (
            <div
              className="array-bar"
              key={index}
              style={{
                backgroundColor: "#444",
                height: `${(value / max_value) * 500}px`,
                width: `${Math.min(50, 800 / size)}px`,
              }}
            ></div>
          ))}
        </div>
      </div>
    );
  }
}

export default Visualizer;
