import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '@atlaskit/button';
import Icon from '@atlaskit/icon';
import Icons from './Icons';

import Select from 'react-select';

let finalOptions = null;

const Wrapper = styled.div`
    
`

const Container = styled.div`
    width: 200px;
`

export default class TestPriority extends Component {

    constructor(props) {
        super(props);

        this.state = {
            optionsArray: this.loadOptions(),
            options: null,
            selctedOption: null,
            defaultSet: false,
            index: this.props.index,
            defaultVal: this.props.defaultVal,
        }

        if (this.props.defaultVal != null) {
            this.loadOptions();
        }
        else {
            this.setOptions();
        }
        
    }

    setOptions = () => {
        let options = [];
        let obj = {};

        options = [
            {value: "High", label: <Wrapper><Icons name="High" /> High</Wrapper> },
            {value: "Medium", label: <Wrapper><Icons name="Medium" /> Medium</Wrapper> },
            {value: "Low", label: <Wrapper><Icons name="Low" /> Low</Wrapper> },
        ]

        finalOptions = options;
    }

    setPriority = (event) => {
        this.props.setPriority(event.value);
    }

    loadOptions = () => {
        let arr = [];
        switch (this.props.defaultVal) {
            case 'High':
                arr = [
                {value: "High", label: <Wrapper><Icons name="High" /> High</Wrapper> },
                {value: "Medium", label: <Wrapper><Icons name="Medium" /> Medium</Wrapper> },
                {value: "Low", label: <Wrapper><Icons name="Low" /> Low</Wrapper> },
                ];
                break;
            case 'Medium':
                arr = [
                    {value: "High", label: <Wrapper><Icons name="High" /> High</Wrapper> },
                    {value: "Medium", label: <Wrapper><Icons name="Medium" /> Medium</Wrapper> },
                    {value: "Low", label: <Wrapper><Icons name="Low" /> Low</Wrapper> },
                ];
                break;
            case 'Low':
                arr = [
                    {value: "High", label: <Wrapper><Icons name="High" /> High</Wrapper> },
                    {value: "Medium", label: <Wrapper><Icons name="Medium" /> Medium</Wrapper> },
                    {value: "Low", label: <Wrapper><Icons name="Low" /> Low</Wrapper> },
                ];
                break;
        }

        this.setState({optionsArray: arr});
        return arr;
    }

    render() {

        if (this.props.defaultVal != null) {
            return (
                <Container>
                <Select
                value={this.selectedOption}
                onChange={(val) => this.setPriority(val)}
                options={this.state.optionsArray}
                isSearchable={false}
                defaultValue={{ value: this.state.defaultVal, label: <Wrapper><Icons name={this.state.defaultVal} /> {this.state.defaultVal}</Wrapper>}}
                 />
                 </Container>

            )
        }
    
        return(
            <Select
                defaultValue={{ value: null, label: "Select a priority..." }}
                isLoading={false}
                isClearable={false}
                isSearchable={false}
                options={finalOptions}
                onChange={(val) => this.setPriority(val)}
            />
        );
    }
}