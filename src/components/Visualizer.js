import React, { Component } from "react";
import CustomizeArrayDrawer from "./CustomizeArrayDrawer";
// import Log from "./Log";
import sortArray from "../algorithms/Sort.js";

import { Statistic, Card, Row, Col } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";

import "./Visualizer.css";
import "antd/dist/antd.css";
import { Layout, Button, Select, notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;
const { Option } = Select;
const COLOR1 = "#444";
const COLOR2 = "red";

const complexity = {
  "Bubble Sort": "O(n2)",
  "Selection Sort": "O(n2)",
  "Insertion Sort": "O(n2)",
  "Merge Sort": "O(nlog(n))",
  "Quick Sort": "O(nlog(n))",
  "Heap Sort": "O(nlog(n))",
};

export default class Visual extends Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      size: 50,
      min_value: 5,
      max_value: 500,
      animation_speed: 3,
      sortMethod: "Bubble Sort",
      isDrawerVisible: false,
      isSorting: false,
      log: [],
      reset: false,
    };
  }

  componentDidMount() {
    this.generateArray();
  }

  // show drawer to customize the array
  showDrawer = () => {
    this.setState({
      isDrawerVisible: true,
    });
  };

  // closes 'customize array' drawer
  onClose = () => {
    this.setState({
      isDrawerVisible: false,
    });
  };

  handleReset = () => {
    this.setState({ reset: !this.state.reset });
  };

  //chandler to change size of the array
  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
    this.generateArray();
  };

  //handler to change range of value of elements in array
  handleValueChange = (e) => {
    const [x, y] = e;

    this.setState({
      min_value: Math.min(x, y),
      max_value: Math.max(x, y),
    });

    this.generateArray();
  };

  //handles change in sort method
  onSortMethodChange = (e) => {
    this.setState({ sortMethod: e });
  };

  //change animation speed
  handleAnimationSpeedChange = (e) => {
    this.setState({ animation_speed: parseInt(e) });
  };

  //generate a random array
  generateArray = () => {
    const array = [];
    const { size, min_value, max_value } = this.state;

    for (let i = 1; i <= size; i++) {
      array.push(randomIntFromInterval(min_value, max_value));
    }
    this.setState({ array });
  };

  openNotification = (sorting_time, size, sortMethod, animation_speed) => {
    notification.open({
      message: "Hurray!",
      description: `Took ${sorting_time} milliseconds to sort an array of size ${size} using ${sortMethod} when animation speed is ${animation_speed}.`,
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
  };

  //main sort handler, animates and sorts the array
  handleSort = () => {
    //indicates sorting is about to be performed so disable all other input fields
    this.setState({ isSorting: true });
    const { sortMethod, animation_speed, size } = this.state;
    const actions = sortArray(this.state.array, sortMethod);

    //actions.map((item) => console.log("item", item));

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
        }, i * animation_speed);
      } else {
        setTimeout(() => {
          //bar1.style.color = COLOR2;
          bar1.style.height = `${y}px`;
        }, i * animation_speed);
      }
    }

    //reset disabled state of all button to false
    const sorting_time = animation_speed * actions.length;

    setTimeout(() => {
      this.openNotification(sorting_time, size, sortMethod, animation_speed);
      this.setState({
        isSorting: false,
        log: this.state.log.push([
          sortMethod,
          size,
          animation_speed,
          sorting_time,
        ]),
      });
    }, parseInt(sorting_time));
  };

  render() {
    const {
      array,
      size,
      min_value,
      max_value,
      sortMethod,
      animation_speed,
      isDrawerVisible,
      isSorting,
    } = this.state;

    return (
      <Layout className="AppContainer">
        <Header className="header">
          <Select
            defaultValue={sortMethod}
            placeholder="Select Sorting Algorithm"
            onChange={this.onSortMethodChange}
            disabled={isSorting}
          >
            <Option value="Bubble Sort">Bubble Sort</Option>
            <Option value="Selection Sort">Selection Sort</Option>
            <Option value="Insertion Sort">Insertion Sort</Option>
            <Option value="Merge Sort">Merge Sort</Option>
            <Option value="Quick Sort">Quick Sort</Option>
            <Option value="Heap Sort">Heap Sort</Option>
          </Select>
          <Button
            type="ghost"
            onClick={this.generateArray}
            disabled={isSorting}
          >
            Generate New Array
          </Button>
          <Button type="ghost" onClick={this.showDrawer} disabled={isSorting}>
            Customize Array
          </Button>
          <Button
            className="sort"
            type="primary"
            onClick={this.handleSort}
            disabled={isSorting}
          >
            Sort
          </Button>
          <Button
            type="primary"
            className="sort"
            onClick={this.handleReset}
            disabled={!isSorting}
          >
            Stop Sort (Broken)
          </Button>
        </Header>

        <Layout className="layout main-section">
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
            sortMethod={sortMethod}
            animation_speed={animation_speed}
            visible={isDrawerVisible}
            onClose={this.onClose}
            handleValueChange={this.handleValueChange}
            handleSizeChange={this.handleSizeChange}
            onSortMethodChange={this.onSortMethodChange}
            handleAnimationSpeedChange={this.handleAnimationSpeedChange}
          />
        </Layout>

        <Layout>
          <div className="site-statistic-demo-card">
            <Row gutter={16}>
              <Col span={6}>
                <Card>
                  <Statistic
                    title="Sort Algorithm"
                    value={sortMethod}
                    valueStyle={{ color: "#3f8600" }}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <Statistic
                    title="Time Complexity"
                    value={complexity[sortMethod]}
                    valueStyle={{ color: "#cf1322" }}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <Statistic
                    title="Array Size"
                    value={size}
                    valueStyle={{ color: "#3f8600" }}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <Statistic
                    title="Animation Speed"
                    value={animation_speed}
                    valueStyle={{ color: "#3f4200" }}
                    prefix={<ArrowUpOutlined />}
                    suffix="ms"
                  />
                </Card>
              </Col>
            </Row>
          </div>
        </Layout>
      </Layout>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
