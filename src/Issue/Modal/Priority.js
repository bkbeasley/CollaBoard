import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '@atlaskit/button';
import PriorityHighIcon from '@atlaskit/icon-priority/glyph/priority-high';
import PriorityMediumIcon from '@atlaskit/icon-priority/glyph/priority-medium';
import Dropdown from './Dropdown';

//import Select from 'react-select';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

const Text = styled.h3`
    font-size: 14px;
    font-weight: 700;
`

let optionsArray = [];

export default class Priority extends Component {

    constructor(props) {
        super(props);
        this.optionsSetup();
        this.state = {
            dropdownOpen: false,
            value: 'HIGH',
        }
    }

    setPriority = (event) => {
        this.setState({ value: event.target.value });
    }

    optionsSetup = () => {
        switch (this.props.priority) {
            case 'High':
                optionsArray = ["Medium", "Low"];
                break;
            case 'Medium':
                optionsArray = ["High", "Low"];
                break;
            case 'Low':
                optionsArray = ["High", "Medium"];
                break;
        }
    }

    showDropDown = () => {
        this.setState({dropdownOpen: true});
    }

    render() {
        return (
            <div>
                {/*<Button appearance="primary" onClick={() => this.showDropDown()}>{this.state.value}</Button> */}
                
                    {/* <Select
                        defaultValue={{ value: null, label: "Select a priority..." }}
                        isLoading={false}
                        isClearable={false}
                        isSearchable={false}
                        options={[{value: 'Medium', label: "MEDIUM"}, {value: 'Low', label: "LOW"}]}
                        onChange={(val) => this.setPriority(val)}
                    /> */}
                    <InputLabel id="priority-label">{this.state.value}</InputLabel>
                    <Select
                        labelId="priority-label"
                        autoWidth="true"
                        value={this.state.value}
                        displayEmpty={true}
                        onChange={(val) => this.setPriority(val)}
                    >
                        <option value="HIHDIJDI"></option>
                        <MenuItem value="Medium">MEDIUM</MenuItem>
                        <MenuItem value="Low">LOW</MenuItem>
                    </Select>
                
                {/* <Dropdown initialOption={this.props.priority} optionsArray={optionsArray} selectOption={this.setPriority}/> */}
            </div>
        );
    }
}