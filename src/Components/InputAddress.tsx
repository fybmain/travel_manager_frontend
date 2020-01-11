import React from 'react';
import { Select, Input } from 'antd';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import { CityList, Address } from '../Models';

export interface InputAddressProps {
  value?: Address;
  onChange?: (value: Address) => void;
}

@observer
export class InputAddress extends React.Component<InputAddressProps> {
  @observable private adress: Address;
  @observable private cityList!: string[];

  constructor(props: InputAddressProps){
    super(props);
    if(props.value){
      this.adress = props.value;
    }else{
      this.adress = {
        province: "",
        city: "",
        detail: "",
      }
    }
    this.updateCityList();
  }

  handleChange(field: "province"|"city"|"detail", value: string){
    this.adress[field] = value;
    if(field==="province"){
      this.updateCityList();
      this.adress.city = "";
    }
    if(this.props.onChange){
      this.props.onChange(this.adress);
    }
  }

  updateCityList = () => {
    this.cityList = ((CityList[this.adress.province]===undefined)?[]:(CityList[this.adress.province]));
  }

  render() {
    return (
      <Input.Group compact>

        <Select
          value={this.adress.province}
          onChange={(value: string) => {this.handleChange("province", value)}}
          style={{ width: "20%" }}>
          {
            Object.keys(CityList).map(
              (value) => (
                <Select.Option value={value}>{value}</Select.Option>
              )
            )
          }
        </Select>

        <Select
          value={this.adress.city}
          onChange={(value: string) => {this.handleChange("city", value)}}
          style={{ width: "20%" }}>
          {
            this.cityList.map(
              (value) => (
                <Select.Option value={value}>{value}</Select.Option>
              )
            )
          }
        </Select>

        <Input
          value={this.adress.detail}
          onChange={(e) => {this.handleChange("detail", e.target.value)}}
          style={{ width: "60%" }}/>

      </Input.Group>
    );
  }
}
