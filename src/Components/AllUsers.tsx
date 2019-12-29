import React, { Component } from 'react';
import { Switch, Dropdown, Button, Icon, Menu, Select } from 'antd';
import {observable} from 'mobx';
import { observer } from 'mobx-react';
import { Table, Divider, Tag } from 'antd';
import Column from 'antd/lib/table/Column';
import '../App.css';

const { Option } = Select;

@observer
export class AllUsers extends Component {
    
    @observable showAllData:boolean = false;
    render() {
        return (
            <div>
                <br/>
                <span className="myFont">&nbsp;&nbsp;待审核 &nbsp;</span>
                <span><Switch onChange={this.onChange} /></span>
                <br/>
                <br/>
                {this.showData(this.showAllData)}
            </div>
        );
    }

    onChange=(checked: boolean, event: MouseEvent)=>{
        this.showAllData=!this.showAllData;
    }

    showData=(showAllData:boolean)=>{
        return (showAllData?
            <div>{table2()}</div>
        :<div>{table1()}</div>)
    }

}

function handleChange(e: any) {
    console.log('click', e);
  }


  
const table1=()=>{
    return(
        <Table dataSource={data1}>
            <Column title="用户ID" dataIndex="id" key="id" />
            <Column title="工号" dataIndex="workId" key="workId" />
            <Column title="姓名" dataIndex="name" key="name" />
            <Column title="邮箱" dataIndex="email" key="email" />
            <Column title="手机号" dataIndex="telephone" key="telephone" />
            <Column title="部门" dataIndex="department" key="department" />
            <Column
            title="角色"
            key="role"
            render={(text, record) => (
                <span>
                    <Select defaultValue="员工" style={{ width: 120 }} onChange={handleChange} key="select">
                        <Option value="员工">员工</Option>
                        <Option value="部门经理">部门经理</Option>
                        <Option value="总经理">总经理</Option>
                    </Select>
                </span>
            )}
            />
            <Column
            title="Action"
            key="action"
            render={(text, record) => (
                <span>
                <a>Pass</a>
                <Divider type="vertical" />
                <a>Delete</a>
                </span>
            )}
            />
        </Table>
    );
    
}

const data1 = [
    {
        id: "1",
        key: "1",
        workId:"2016210946",
        name:"张三",
        email:"829754137@qq.com",
        telephone:"15865485249",
        department:"财务部",
    },
    {
        id: "2",
        key: "2",
        workId:"2016210946",
        name:"张四",
        email:"825975837@qq.com",
        telephone:"15865485249",
        department:"市场部",
    },
    {
        id: "3",
        key: "3",
        workId:"2016210946",
        name:"张五",
        email:"825375417@qq.com",
        telephone:"15865485249",
        department:"人力资源部",
    },
    {
        id: "4",
        key: "4",
        workId:"2016211946",
        name:"张六",
        email:"825375417@qq.com",
        telephone:"15865485249",
        department:"信息科技部",
    },
  ];

const table2=()=>{
    return(
        <Table dataSource={data1}>
            <Column title="用户ID" dataIndex="id" key="id" />
            <Column title="工号" dataIndex="workId" key="workId" />
            <Column title="姓名" dataIndex="name" key="name" />
            <Column title="邮箱" dataIndex="email" key="email" />
            <Column title="手机号" dataIndex="telephone" key="telephone" />
            <Column title="部门" dataIndex="department" key="department" />
            <Column
            title="角色"
            key="role"
            render={(text, record) => (
                <span>
                    <Select defaultValue="员工" style={{ width: 120 }} onChange={handleChange} key="select">
                        <Option value="员工">员工</Option>
                        <Option value="部门经理">部门经理</Option>
                        <Option value="总经理">总经理</Option>
                    </Select>
                </span>
            )}
            />
            <Column
            title="账号可用状态"
            key="action"
            render={(text, record) => (
                <span>
                <Switch/>
                </span>
            )}
            />
        </Table>
    );
}