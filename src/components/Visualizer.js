import React, { Component } from "react";
import "antd/dist/antd.css";
import { Layout, Button } from "antd";
import "./Visualizer.css";
import CustomizeArrayDrawer from "./CustomizeArrayDrawer.js";

import sortArray from "../algorithms/Sort.js";

const { Header, Content } = Layout;

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const ANIMATION_SPEED = 3;
const COLOR1 = "#444";
const COLOR2 = "red";

export default class Visual extends Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      size: 100,
      min_value: 5,
      max_value: 500,
      isDrawerVisible: false,
      isSorting: false,
    };
  }

  componentDidMount() {
    this.generateArray();
  }

  showDrawer = () => {
    this.setState({
      isDrawerVisible: true,
    });
  };

  onClose = () => {
    this.setState({
      isDrawerVisible: false,
    });
  };

  handleSizeChange = (e) => {
    this.setState({
      size: e,
    });

    this.generateArray();
  };

  handleValueChange = (e) => {
    const [x, y] = e;
    this.setState({
      min_value: Math.min(x, y),
      max_value: Math.max(x, y),
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

  handleSort = () => {
    //this.setState({ isSorting: true });
    const actions = sortArray(this.state.array, "Selection Sort");

    for (let i = 0; i < actions.length; i++) {
      const arrayBar = Array.from(document.querySelectorAll(".array-bar"));
      const [type, x, y] = actions[i];
      const bar1 = arrayBar[x];

      if (type !== 1) {
        const bar2 = arrayBar[y];
        setTimeout(() => {
          const color = type === 2 ? COLOR1 : COLOR2;
          bar1.style.backgroundColor = color;
          bar2.style.backgroundColor = color;
        }, i * ANIMATION_SPEED);
      } else {
        setTimeout(() => {
          //bar1.style.color = COLOR2;
          bar1.style.height = `${y}px`;
        }, i * ANIMATION_SPEED);
      }
    }
  };

  render() {
    const {
      array,
      size,
      min_value,
      max_value,
      isDrawerVisible,
      isSorting,
    } = this.state;

    return (
      <Layout>
        <Header className="header">
          <Button onClick={this.generateArray} disabled={isSorting}>
            Generate New Array
          </Button>
          <Button type="dashed" onClick={this.showDrawer} disabled={isSorting}>
            Customize Array
          </Button>
          <Button type="primary" onClick={this.handleSort}>
            Sort
          </Button>
        </Header>
        <Layout className="layout">
          <Content className="array-container" style={{ padding: "0 50px" }}>
            {array.map((value, index) => (
              <div
                className="array-bar"
                key={index}
                style={{
                  backgroundColor: `${COLOR1}`,
                  height: `${value}px`,
                  width: `${Math.min(50, 800 / size)}px`,
                }}
              ></div>
            ))}
          </Content>

          <CustomizeArrayDrawer
            size={size}
            min_value={min_value}
            max_value={max_value}
            visible={isDrawerVisible}
            onClose={this.onClose}
            handleValueChange={this.handleValueChange}
            handleSizeChange={this.handleSizeChange}
          />
        </Layout>
      </Layout>
    );
  }
}
