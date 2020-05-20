import React, { Component } from "react";
import CustomizeArrayDrawer from "./CustomizeArrayDrawer";
import Tips from "./Tips";
import {
  randomIntFromInterval,
  COLOR1,
  COLOR2,
  sorts,
  complexity,
  NavbarButtons,
  columns,
} from "./Utils/utils.js";

import sortArray from "../algorithms/Sort.js";

import "./Visualizer.css";
import "antd/dist/antd.css";
import { Layout, Button, notification, Menu, Table, Affix } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SortAscendingOutlined,
  NotificationOutlined,
  EditOutlined,
  BuildOutlined,
  UnorderedListOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

export default class Visualizer extends Component {
  state = {
    array: [],
    size: 100,
    min_value: 5,
    max_value: 300,
    animation_speed: 3,
    sortMethod: "Merge Sort",
    isDrawerVisible: false,
    areTipsVisible: false,
    isSorting: false,
    reset: false,
    siderCollapsed: false,
    sortOrder: 1,
    log: [],
  };

  componentDidMount() {
    this.generateArray();
  }

  clearLog = () => {
    this.setState({ log: [] });
  };

  /*********************************************************************************************************************************************
   *                                                          FOOTER
   *********************************************************************************************************************************************/

  footer = () => {
    if (this.state.log.length)
      return (
        <div>
          Clear Log{" "}
          <DeleteOutlined
            onClick={(event) => {
              event.preventDefault();
              this.clearLog();
            }}
          />
        </div>
      );
  };

  /********************************************************************************************************************************************* *
   *                                               TOGGLE DRAWER, SLIDER, TIPS, WARNING MESSAGE
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

  toggleTips = () => {
    this.setState({ areTipsVisible: !this.state.areTipsVisible });
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

  handleSortOrderChange = (e) => {
    this.setState({ sortOrder: this.state.sortOrder * -1 });
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
    const { sortMethod, array, sortOrder } = this.state;
    const actions = sortArray(array, sortMethod, sortOrder);
    this.animations(actions, sortMethod);
  };

  handleMultipleSort = () => {};

  /************************************************************************************************************************************************
   *                                                                  ANIMATIONS
   *************************************************************************************************************************************************/

  animations = (actions, sortMethod) => {
    this.setState({ isSorting: true });
    const { animation_speed, size } = this.state;

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
      const messageDescription = `Took ${sorting_time} milliseconds to sort an array of size ${size} using ${sortMethod} with animation speed of ${animation_speed} ms.`;
      this.openNotification(messageDescription);
      this.setState({
        isSorting: false,
        log: [
          ...this.state.log,
          {
            key: this.state.log.length,
            sort: sortMethod,
            complexity: complexity[sortMethod],
            animationSpeed: animation_speed,
            N: size,
            timetaken: sorting_time,
          },
        ],
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
      areTipsVisible,
      isSorting,
      log,
      sortOrder,
    } = this.state;

    const displayValue = [
      sortMethod,
      complexity[sortMethod],
      animation_speed,
      size,
      min_value,
      max_value,
      isDrawerVisible,
      sortOrder,
    ];

    const classMethods = [
      this.generateArray,
      this.toggleDrawer,
      this.toggleTips,
      this.handleValueChange,
      this.handleSizeChange,
      this.handleAnimationSpeedChange,
      this.handleSortOrderChange,
    ];

    const icons = [
      <BuildOutlined />,
      <EditOutlined />,
      <UnorderedListOutlined />,
    ];

    // const pos = window.screen.height / 8;

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
              {sorts.map((item, index) => (
                <Menu.Item
                  title={`Time Complexity: ${complexity[item]}`}
                  key={index}
                  disabled={isSorting}
                  onClick={this.onSortMethodChange}
                  className={item === sortMethod ? "activeSort" : ""}
                >
                  {item}
                </Menu.Item>
              ))}
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
              shape="round"
            >
              Sort
            </Button>
            <Button
              className="header-buttons"
              type="primary"
              disabled={!isSorting}
              shape="round"
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

          <Tips visible={areTipsVisible} toggleTips={this.toggleTips} />

          {/************************************ SHOW LOG **********************************/}

          <Content className="log-container">
            <Table
              columns={columns}
              dataSource={log.slice().reverse()}
              pagination={false}
              bordered
              style={{ maxWidth: "45em", margin: "0 auto" }}
              scroll={{ y: 235 }}
              footer={() => this.footer()}
            />
          </Content>

          {/*****************************  CUSTOMIZE ARRAY DRAWER **********************************/}

          <CustomizeArrayDrawer
            data={displayValue.slice(2)}
            onClose={this.toggleDrawer}
            methods={classMethods.slice(3)}
          />

          {/* <div className="array-details">
            <Affix offsetBottom={4 * pos}>
              <Button>
                ANIMATION SPEED{" "}
                <span className="array-details-value">
                  | {animation_speed} ms
                </span>
              </Button>
            </Affix>
            <Affix offsetBottom={3 * pos}>
              <Button>
                N <span className="array-details-value">| {size}</span>
              </Button>
            </Affix>
            <Affix offsetBottom={2 * pos}>
              <Button>
                MIN <span className="array-details-value">| {min_value}</span>
              </Button>
            </Affix>
            <Affix offsetBottom={pos}>
              <Button>
                MAX <span className="array-details-value">| {max_value}</span>
              </Button>
            </Affix>
          </div> */}
        </Layout>
      </Layout>
    );
  }
}
