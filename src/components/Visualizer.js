import React, { Component } from "react";
import CustomizeArrayDrawer from "./CustomizeArrayDrawer";
import Log from "./Log";
import {
  randomIntFromInterval,
  COLOR1,
  COLOR2,
  sorts,
  complexity,
  //arrayDetails,
  NavbarButtons,
} from "./Utils/utils.js";

import sortArray from "../algorithms/Sort.js";

import "./Visualizer.css";
import "antd/dist/antd.css";
import { Layout, Button, notification, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SortAscendingOutlined,
  NotificationOutlined,
  EditOutlined,
  BuildOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

export default class Visualizer extends Component {
  state = {
    array: [],
    size: 100,
    min_value: 5,
    max_value: 800,
    animation_speed: 3,
    sortMethod: "Merge Sort",
    isDrawerVisible: false,
    isSorting: false,
    reset: false,
    log: [],
    siderCollapsed: false,
  };

  componentDidMount() {
    this.generateArray();
  }

  clearLog = () => {
    this.setState({ log: [] });
  };

  /*********************************************************************************************************************************************
   *                                                          DISPLAY INSTRUCTIONS
   *********************************************************************************************************************************************/

  displayInstructions = () => {
    alert("here are your instructions");
  };

  /********************************************************************************************************************************************* *
   *                                                          DRAWER TOGGLE AND SLIDER TOGGLE
   * **********************************************************************************************************************************************/

  toggleDrawer = () => {
    this.setState({
      isDrawerVisible: !this.state.isDrawerVisible,
    });
  };

  toggleSider = () => {
    this.setState({
      siderCollapsed: !this.state.siderCollapsed,
    });
  };

  /************************************************************************************************************************************************
   *                                                                  ON CHANGE METHODS
   *************************************************************************************************************************************************/

  //handler to stop sorting
  handleStopSort = () => {
    this.setState({ reset: !this.state.reset });
  };

  //handler to change size of the array
  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
    this.generateArray();
  };

  //handler to change range of value of elements in array
  handleValueChange = ([x, y]) => {
    this.setState({
      min_value: Math.min(x, y),
      max_value: Math.max(x, y),
    });

    this.generateArray();
  };

  //handles change in sort method
  onSortMethodChange = (e) => {
    this.setState({ sortMethod: sorts[e.key] });
  };

  //change animation speed
  handleAnimationSpeedChange = (e) => {
    this.setState({ animation_speed: e.target.value });
  };

  /*********************************************************************************************************************************************
   *                                                        GENERATE RANDOM ARRAY
   **********************************************************************************************************************************************/

  generateArray = () => {
    const array = [];
    const { size, min_value, max_value } = this.state;

    for (let i = 1; i <= size; i++) {
      array.push(randomIntFromInterval(min_value, max_value));
    }
    this.setState({ array });
  };

  /*********************************************************************************************************************************************
   *                                                         NOTIFICATION POPUP
   **********************************************************************************************************************************************/

  openNotification = (description) => {
    notification.open({
      message: "Hurray!",
      description: description,
      icon: <NotificationOutlined style={{ color: "#108ee9" }} />,
    });
  };

  /************************************************************************************************************************************************
   *                                                       HANDLE SINGLE AND MULTIPLE SORTS
   *************************************************************************************************************************************************/

  handleSingleSort = () => {
    //indicates sorting is about to be performed
    //so disable all other input fields
    const { sortMethod } = this.state;
    const actions = sortArray(this.state.array, sortMethod);
    this.animations(actions, sortMethod);
  };

  handleMultipleSort = () => {};

  /************************************************************************************************************************************************
   *                                                                  ANIMATIONS
   *************************************************************************************************************************************************/

  animations = (actions, sortMethod) => {
    this.setState({ isSorting: true });
    const { animation_speed, size, log } = this.state;

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
          bar1.style.height = `${y}px`;
        }, i * animation_speed);
      }
    }

    const sorting_time = animation_speed * actions.length;

    setTimeout(() => {
      const messageDescription = `Took ${sorting_time} milliseconds to sort an array of size ${size} using ${sortMethod} when animation speed is ${animation_speed} ms.`;
      this.openNotification(messageDescription);

      const time_complexity = complexity[sortMethod];
      const idx = log.length;

      log.push({
        key: `${idx}`,
        sort: sortMethod,
        complexity: time_complexity,
        N: size,
        animationSpeed: animation_speed,
        timetaken: `${sorting_time}ms`,
      });
      this.setState({ isSorting: false, log: log });
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
      log,
    } = this.state;

    const displayValue = [
      sortMethod,
      complexity[sortMethod],
      animation_speed,
      size,
      min_value,
      max_value,
      isDrawerVisible,
    ];

    const classMethods = [
      this.generateArray,
      this.toggleDrawer,
      this.displayInstructions,
      this.handleValueChange,
      this.handleSizeChange,
      this.handleAnimationSpeedChange,
    ];

    const icons = [
      <BuildOutlined />,
      <EditOutlined />,
      <UnorderedListOutlined />,
    ];

    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.siderCollapsed}>
          <div className="logo" />
          <Menu
            defaultOpenKeys={["sub1"]}
            mode="inline"
            theme="dark"
            inlineCollapsed={this.state.siderCollapsed}
          >
            <SubMenu
              disabled={isSorting}
              key="sub1"
              icon={<SortAscendingOutlined />}
              title={sortMethod}
            >
              {sorts.map((item, index) =>
                sortMethod !== item ? (
                  <Menu.Item
                    key={index}
                    disabled={isSorting}
                    onClick={this.onSortMethodChange}
                  >
                    {item}
                  </Menu.Item>
                ) : (
                  ""
                )
              )}
            </SubMenu>

            {NavbarButtons.map((menuItem, index) => (
              <Menu.Item
                className={menuItem["title"]}
                key={index + 6}
                icon={icons[index]}
                onClick={classMethods[index]}
                disabled={isSorting === menuItem["disabled"] && index !== 2}
              >
                {menuItem["title"]}
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background">
            {React.createElement(
              this.state.siderCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: this.toggleSider,
              }
            )}
            <Button
              className="header-buttons"
              type="primary"
              onClick={this.handleSingleSort}
              disabled={isSorting}
            >
              Sort
            </Button>
            <Button
              className="header-buttons"
              type="primary"
              disabled={!isSorting}
            >
              Stop
            </Button>
          </Header>

          <Content className="array-container" style={{ padding: "0 50px" }}>
            {array.map((value, index) => (
              <div
                className="array-bar"
                key={index}
                style={{
                  backgroundColor: `${COLOR1}`,
                  height: `${value}px`,
                  width: `${Math.min(10, 800 / size)}px`,
                }}
              ></div>
            ))}
          </Content>

          {/************************************ SHOW LOG **********************************/}

          <Content className="log-container">
            <Log
              disabled={isSorting}
              log={log}
              handleMultipleSort={this.handleMultipleSort}
              clearLog={this.clearLog}
            />
          </Content>

          {/*****************************  CUSTOMIZE ARRAY DRAWER **********************************/}

          <CustomizeArrayDrawer
            data={displayValue.slice(2)}
            onClose={this.toggleDrawer}
            methods={classMethods.slice(3)}
          />
        </Layout>
      </Layout>
    );
  }
}
