import React from 'react';
import { Row, Col, InputNumber } from 'antd';

export interface InputMoneyAmountProps {
  value?: number,
  onChange?: (value: number) => void,
}

export class InputMoneyAmount extends React.Component<InputMoneyAmountProps> {
  constructor(props: InputMoneyAmountProps) {
    super(props);
  }

  handleChange = (value: number|undefined) => {
    if(this.props.onChange){
      if((typeof(value)!=="number")||(value<=0)){
        this.props.onChange(0);
      }else{
        this.props.onChange(value);
      }
    }
  }

  render() {
      return (
        <Row>
          <Col span={7}>
            <InputNumber
              value={this.props.value}
              onChange={this.handleChange}
              style={{width: "100%"}}/>
          </Col>
          <Col span={1}>
            元
          </Col>
        </Row>
      )
  }
}
