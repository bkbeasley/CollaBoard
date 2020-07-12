import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '@atlaskit/button';
import Avatar from '@atlaskit/avatar';

import Select from 'react-select';
import { MenuItem } from '@material-ui/core';
import Dropdown from './Dropdown';


const Text = styled.h3`
    font-size: 14px;
    font-weight: 700;
`

const Wrapper = styled.div`
    
    max-width: 120px;
`

let pp = null;

export default class Assignee extends Component {

    constructor(props) {
        super(props);
        this.setOptions();
    }

    state = {
        test: null,
    }

    handleChange = (val) => {
        let username = val.value;
        let avatar = val.label.props.children[0].props.src;
        let obj = {username: username, avatar: avatar};

        this.props.setAssignee(obj);
    }

    setOptions = () => {
        let options = [];
        let obj = {};

        for (let i = 0; i < this.props.members.length; i++) {
            obj = {
                value: this.props.members[i].username,
                label: <Wrapper><Avatar src={this.props.members[i].avatar} size="small" />{this.props.members[i].username}</Wrapper>,
            }
            options.push(obj);
        }

        pp = options;
    }

    render() {

        if (this.props.currentAssigneeName === null && this.props.currentAssigneeAvatar === null) {
        
            return (
                <div>
                {/* <Text>Assignee</Text> */}
                {/* <Wrapper><Button iconBefore={<Avatar src={"https://api.adorable.io/avatars/40/abott@adorable.png"} size="small" />}>Kyle B...</Button></Wrapper> */}
                <Select
                    defaultValue={{ value: null, label: "Select an assignee..."}}
                    isLoading={false}
                    isClearable={false}
                    isSearchable={false}
                    options={pp}
                    onChange={(val) => this.handleChange(val)}
                />
                {/* <Select
                    labelId="Assignee"
                    value={this.state.test}
                    onChange={this.handleChange}
                >
                    <Wrapper>
                        <MenuItem value={"III"}>
                            <Avatar src={"https://api.adorable.io/avatars/40/abott@adorable.png"} size="small" /> JIJIMI
                            </MenuItem>
                    </Wrapper>
                    <MenuItem value={"AAA"}>AAA</MenuItem>
                    </Select> */}
                </div>
            );
        }
        else {
            return (
                <Select
                    defaultValue={{ value: this.props.currentAssigneeName, label: <Wrapper><Avatar src={this.props.currentAssigneeAvatar} size="small" />{this.props.currentAssigneeName}</Wrapper>}}
                    isLoading={false}
                    isClearable={false}
                    isSearchable={false}
                    options={pp}
                    onChange={(val) => this.handleChange(val)}
                />
            )
        }
    }
}