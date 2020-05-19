import React, { Component } from "react";

import { Collapse, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

const columns = [
  {
    title: "Sort",
    dataIndex: "sort",
  },
  {
    title: "Complexity",
    dataIndex: "complexity",
  },
  {
    title: "N",
    dataIndex: "N",
  },
  {
    title: "Animation Speed",
    dataIndex: "animationSpeed",
  },
  {
    title: "Time Taken",
    dataIndex: "timetaken",
  },
];

// const data = [
//   {
//     key: "0",
//     sort: "Bubble Sort",
//     complexity: "O(n2)",
//     N: 200,
//     animationSpeed: 3,
//     timetaken: `2234ms`,
//   },
//   {
//     key: "1",
//     sort: "Bubble Sort",
//     complexity: "O(n2)",
//     N: 200,
//     animationSpeed: 3,
//     timetaken: `2234ms`,
//   },
//   {
//     key: "2",
//     sort: "Quick Sort",
//     complexity: "O(nlogn)",
//     N: 200,
//     animationSpeed: 3,
//     timetaken: `2234ms`,
//   },
// ];

export default class Log extends Component {
  genExtra = () => (
    <DeleteOutlined
      onClick={(event) => {
        event.preventDefault();
        this.props.clearLog();
      }}
    />
  );

  render() {
    const { log } = this.props;

    console.log(log);

    return (
      <div>
        <div>
          <Collapse
            expandIconPosition="left"
            defaultActiveKey={["1"]}
            style={{ maxWidth: "50em", margin: "0 auto", display: "none" }}
          >
            <Panel header="Sort Log" key="1" extra={this.genExtra()}>
              <Table
                columns={columns}
                dataSource={log}
                pagination={false}
                bordered
              />
            </Panel>
          </Collapse>
          <br />
        </div>
      </div>
    );
  }
}
