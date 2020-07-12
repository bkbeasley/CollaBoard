import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '@atlaskit/button';
import Icon from '@atlaskit/icon';
import Icons from '../Icons';

import Select from 'react-select';

const Wrapper = styled.div`

`

export default class TypeDropDown extends Component {

    state = {
        optionsArray: this.props.optionsArray,
        options: null,
        selctedOption: null,
        defaultSet: false,
        index: this.props.index,
        defaultVal: this.props.defaultVal,
    }

    componentDidMount() {
        if (this.props.defaultVal != null) {
            this.setState({
                defaultSet: true,
            })
        }
        this.loadOptions();
    }

    setOption = (selectedOption) => {
        this.setState({
            selectedOption: selectedOption,
        })

        this.props.selectOption(selectedOption.value);
    }

    loadOptions = () => {
        if (this.state.optionsArray === null) {
            this.setState({
                options: [
                    {value: 'Story', label: <Wrapper><Icons name={'Story'} /> Story </Wrapper>},
                    {value: 'Task', label: <Wrapper><Icons name={'Task'} /> Task </Wrapper>},
                    {value: 'Bug', label: <Wrapper><Icons name={'Bug'} /> Bug </Wrapper>},
                ]
            })
        }
        else {
            this.setState({
                options: [
                    {value: this.state.optionsArray[0], label: <Wrapper><Icons name={this.state.optionsArray[0]} /> {this.state.optionsArray[0] + "-" + this.state.index}</Wrapper>},
                    {value: this.state.optionsArray[1], label: <Wrapper><Icons name={this.state.optionsArray[1]} /> {this.state.optionsArray[1] + "-" + this.state.index}</Wrapper>},
                    {value: this.state.defaultVal, label: <Wrapper><Icons name={this.state.defaultVal} /> {this.state.defaultVal + "-" + this.state.index}</Wrapper>},
                ],
                defaultSet: true,
            })
        }
    }

    render(){
        if (this.state.defaultVal != null) {
            return (
                <Select
                value={this.selectedOption}
                onChange={this.setOption}
                options={this.state.options}
                isSearchable={false}
                defaultValue={{ value: this.state.defaultVal, label: <Wrapper><Icons name={this.state.defaultVal} /> {this.state.defaultVal + "-" + this.state.index}</Wrapper>}}
                 />

            );
        }

        return(

            <Select
            value={this.selectedOption}
            onChange={this.setOption}
            options={this.state.options}
            isSearchable={false}
            defaultValue={{ value: null, label: "Select an issue type..." }}
             />

        );
    }
}