import React from "react";
import { Modal, Button } from "antd";

const link =
  "https://www.geeksforgeeks.org/analysis-of-different-sorting-techniques/";

export default function Tips(props) {
  return (
    <Modal
      title="Tips"
      visible={props.visible}
      onOk={props.toggleTips}
      onCancel={props.toggleTips}
      footer={[
        <Button key="Ok" type="primary" onClick={props.toggleTips}>
          Ok
        </Button>,
      ]}
    >
      <ul>
        <li>
          Customize Array to change the properties of array bars (number,
          minimum height, maximum height), animation time (default = 3 ms) 
          and order of sorting.
        </li>
        <li>
          For Sorting Algorithms of complexity O(n2). [Bubble Sort, Selection
          Sort and Insertion Sort], try using smaller size array and short
          animation time (~1 ms) for shorter wait time.
          <br />
          Read more about Time Complexities of various Sorting Algorithms{" "}
          <a href={link} target="_blank" rel="noopener noreferrer">
            here
          </a>
          .
        </li>
      </ul>
    </Modal>
  );
}
