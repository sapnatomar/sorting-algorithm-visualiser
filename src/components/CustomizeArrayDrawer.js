import React, { Component } from "react";

import { Drawer, Form, Col, Row, Select, Slider, InputNumber } from "antd";

const { Option } = Select;

export class CustomizeArrayDrawer extends Component {
  render() {
    const {
      size,
      min_value,
      max_value,
      sortMethod,
      animation_speed,
      visible,
      onClose,
      handleSizeChange,
      handleValueChange,
      handleAnimationSpeedChange,
      onSortMethodChange,
    } = this.props;

    return (
      <Drawer
        title="Customize Array"
        width={360}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="algorithm"
                label="Sorting Algorithm"
                initialValue={sortMethod}
              >
                <Select
                  placeholder="Select Sorting Algorithm"
                  onChange={onSortMethodChange}
                >
                  <Option value="Bubble Sort">Bubble Sort</Option>
                  <Option value="Selection Sort">Selection Sort</Option>
                  <Option value="Insertion Sort">Insertion Sort</Option>
                  <Option value="Merge Sort">Merge Sort</Option>
                  <Option value="Quick Sort">Quick Sort</Option>
                  <Option value="Heap Sort">Heap Sort</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="size" label="Size of Array" initialValue={size}>
                <input
                  type="range"
                  min="5"
                  max="400"
                  value={size}
                  className="slider"
                  id="myRange"
                  onClick={handleSizeChange}
                  onChange={handleSizeChange}
                  onMouseUp={handleSizeChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="value_range"
                label="Range of Array values"
                initialValue={[min_value, max_value]}
              >
                <Slider
                  range
                  min={5}
                  max={1000}
                  onChange={handleValueChange}
                  onAfterChange={handleValueChange}
                  autoFocus={true}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="animation_speed"
                label="Set Animation Speed"
                initialValue={animation_speed}
              >
                <InputNumber
                  min={1}
                  max={15}
                  onChange={handleAnimationSpeedChange}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    );
  }
}

export default CustomizeArrayDrawer;
