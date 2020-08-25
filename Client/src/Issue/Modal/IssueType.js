import React, { Component } from 'react';
import StoryIcon from '@atlaskit/icon-object/glyph/story/16';
import BugIcon from '@atlaskit/icon-object/glyph/bug/16';
import TaskIcon from '@atlaskit/icon-object/glyph/task/16';
import styled from 'styled-components';

import Dropdown from './Dropdown';
import TypeDropDown from './Dropdown/TypeDropDown';

//import DropdownMenu, { DropdownItemGroup, DropdownItem } from '@atlaskit/dropdown-menu';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    padding-left: 2px;
    padding-top: 25px;
    width: 140px;
    height: auto;

    :hover {
        background-color: #DFE1E6;
        opacity: 1.0;
        cursor: pointer;
    }
`

const Icon = styled.div`
    position: relative;
    top: 5px;
    left: 5px;
    margin-right: 16px;
`

const Text = styled.p`
    font-size: 14px;
    margin-top: 8px;
    color: #42526E;
    font-weight: 500;
    text-transform: uppercase;
`

const DropdownMenu = styled.div`
    width: 300px;
    z-index: 2;
    border: 1px solid rgba(0, 0, 0, 0.04);
    box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14);
`

const DropdownContainer = styled.div`
    position: abslolute;
`

const DropdownItemGroup = styled.ul`
    list-style: none;
    


`

const DropdownItem = styled.li`
    display: block;
    margin-top: .7rem;
    width: 80px;

    :hover {
        background-color: #B3D4FF	;
        cursor: pointer;
        
    }
`

const Wrapper = styled.div`

`


let optionsArray = [];

export default class IssueType extends Component {

/*     state =  {
        clicked: false,
        isOpen: false,
        text: this.props.type + "-" + this.props.index,
        type: this.props.type,
        index: this.props.index,
        dropdownOptions: ["Bug", "Story", "Task"],
        option_1: "",
        option_2: "",
    } */

    constructor(props) {
        super(props);
        this.state =  {
            clicked: false,
            isOpen: false,
            text: this.props.type + "-" + this.props.index,
            type: this.props.type,
            index: this.props.index,
            dropdownOptions: ["Bug", "Story", "Task"],
            option_1_type: "",
            option_1_icon: "",
            option_2_type: "",
        }

        this.setDropdownOptions();
        this.optionsSetup();
    }

    selectOption1 = () => {
        let placeHolder = this.state.type;
        
        this.setState({
            text: this.state.option_1_type + "-" + this.props.index, 
            option_1_type: placeHolder,
            type: this.state.option_1_type,
            isOpen: false,
        });

        this.props.setType(this.state.option_1_type);
    }

    selectOption2 = () => {
        let placeHolder = this.state.type;
        this.setState({
            text: this.state.option_2_type + "-" + this.props.index, 
            option_2_type: placeHolder,
            type: this.state.option_2_type,
            isOpen: false,
        });

        this.props.setType(this.state.option_2_type);
    }

    setDropdownOptions = () => {
        let arrayIndex = this.state.dropdownOptions.indexOf(this.state.type);
        let finalArray = this.state.dropdownOptions;

        let arr = this.state.dropdownOptions;

        let opt1, opt2;
        let opt1Flag = false;

        arr.forEach(element => {
            if (element !== this.state.type) {
                if (!opt1Flag) {
                    opt1 = element;
                    opt1Flag = true;
                }
                else {
                    opt2 = element;
                }
            }
        });

        this.state.option_1_type = opt1;
        this.state.option_2_type = opt2;
    }

    openDropDown = () => {
        this.setState({
            isOpen: true,
        })
        
    }

    optionsSetup = () => {
        switch (this.props.type) {
            case 'Story':
                optionsArray = ["Task", "Bug"];
                break;
            case 'Task':
                optionsArray = ["Story", "Bug"];
                break;
            case 'Bug':
                optionsArray = ["Story", "Task"];
                break;
        }
    }

    setType = (val) => {
        this.props.setType(val);
    }

    render() {
        
        return (
            <div>
                <TypeDropDown optionsArray={optionsArray} selectOption={this.setType} index={this.props.index} defaultVal={this.props.type} />
                {/* <DropdownContainer>
                <Container onClick={this.openDropDown}>
                <Icon>
                    {this.state.type === "Bug" && (
                        <BugIcon />
                    )}
                    {this.state.type === "Story" && (
                        <StoryIcon />
                    )}
                    {this.state.type === "Task" && (
                        <TaskIcon />
                    )}
                </Icon>
                <Text>{this.state.text}</Text>
                </Container>
                
            {this.state.isOpen && (
                
                <DropdownMenu>
                    <DropdownItemGroup>               
                        <DropdownItem onClick={this.selectOption1}>
                            <Container>
                                <Icon>
                                    {this.state.option_1_type === "Bug" && (
                                        <BugIcon />
                                    )}
                                    {this.state.option_1_type === "Story" && (
                                        <StoryIcon />
                                    )}
                                    {this.state.option_1_type === "Task" && (
                                        <TaskIcon />
                                    )}
                                </Icon>
                                <Text>{this.state.option_1_type}</Text>
                            </Container>
                        </DropdownItem>
                        <DropdownItem onClick={this.selectOption2}>
                            <Container>
                                <Icon>
                                    {this.state.option_2_type === "Bug" && (
                                        <BugIcon />
                                    )}
                                    {this.state.option_2_type === "Story" && (
                                        <StoryIcon />
                                    )}
                                    {this.state.option_2_type === "Task" && (
                                        <TaskIcon />
                                    )}
                                </Icon>
                                <Text>{this.state.option_2_type}</Text>
                            </Container>
                        </DropdownItem>
                    </DropdownItemGroup>
                </DropdownMenu>
                
            )}
            </DropdownContainer> */}
            </div>
        );
    }
}