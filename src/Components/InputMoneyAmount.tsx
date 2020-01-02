import React from 'react';
import { Row, Col, InputNumber } from 'antd';

export class InputMoneyAmount extends React.Component {
    render() {
        return (
          <Row>
            <Col span={7}>
              <InputNumber style={{width: "100%"}}></InputNumber>
            </Col>
            <Col span={1}>
              元
            </Col>
          </Row>
        )
    }
}
