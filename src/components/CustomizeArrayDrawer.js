import React, { Component } from "react";

import { Drawer, Form, Col, Row, Slider, Radio } from "antd";

export class CustomizeArrayDrawer extends Component {
  render() {
    const { data, onClose, methods } = this.props;

    const [
      animation_speed,
      size,
      min_value,
      max_value,
      visible,
      sort_order,
    ] = data;

    const [
      handleValueChange,
      handleSizeChange,
      handleAnimationSpeedChange,
      handleSortOrderChange,
    ] = methods;

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
              <Form.Item name="size" label="Size of Array" initialValue={size}>
                <input
                  type="range"
                  min="5"
                  max="350"
                  value={size}
                  className="slider"
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
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  value={animation_speed}
                  className="slider"
                  onClick={handleAnimationSpeedChange}
                  onChange={handleAnimationSpeedChange}
                  onMouseUp={handleAnimationSpeedChange}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="sort_order"
                label="Sort by order"
                initialValue={sort_order}
              >
                <Radio.Group
                  onChange={handleSortOrderChange}
                  value={sort_order}
                >
                  <Radio value={1}>Ascending</Radio>
                  <Radio value={-1}>Descending</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    );
  }
}

export default CustomizeArrayDrawer;
