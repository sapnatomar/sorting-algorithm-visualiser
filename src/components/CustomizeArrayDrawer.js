import React, { Component } from "react";

import { Drawer, Form, Button, Col, Row, Input, Select, Slider } from "antd";

const { Option } = Select;

export class CustomizeArrayDrawer extends Component {
  render() {
    const {
      size,
      min_value,
      max_value,
      visible,
      onClose,
      handleSizeChange,
      handleValueChange,
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
              <Form.Item name="algorithm" label="Sorting Algorithm">
                <Select placeholder="Select Sorting Algorithm">
                  <Option value="Merge Sort">Merge Sort</Option>
                  <Option value="Buttble Sort">Bubble Sort</Option>
                  <Option value="Selection Sort">Selection Sort</Option>
                  <Option value="Quick Sort">Quick Sort</Option>
                  <Option value="Heap Sort">Heap Sort</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="size" label="Size of Array">
                <Slider
                  defaultValue={size}
                  min={5}
                  max={400}
                  step={5}
                  onChange={handleSizeChange}
                  autoFocus={true}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="value_range" label="Range of Array values">
                <Slider
                  range
                  defaultValue={[min_value, max_value]}
                  min={5}
                  max={600}
                  onChange={handleValueChange}
                  autoFocus={true}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: "please enter url description",
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="please enter url description"
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
