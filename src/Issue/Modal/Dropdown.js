import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '@atlaskit/button';
import Icon from '@atlaskit/icon';
import PriorityHighIcon from '@atlaskit/icon-priority/glyph/priority-high';
import Icons from '../Modal/Icons';

import Select from 'react-select';
import TypeDropDown from './Dropdown/TypeDropDown';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const Text = styled.p`
    font-size: 14px;
    margin-top: 8px;
    color: #42526E;
    font-weight: 500;
    text-transform: uppercase;
`

const Container = styled.div`
    display: flex;
    flex-direction: row;
    padding-left: 2px;
    padding-top: 25px;
`

const DropdownMenu = styled.div`
    width: auto;
    height: auto;
    z-index: 2;
    border: 1px solid rgba(0, 0, 0, 0.04);
    box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14);
`

const DropdownContainer = styled.div`
    position: abslolute;
`

const DropdownItemGroup = styled.ul`
    list-style: none;
    padding-left: 4px;
    
`

const DropdownItem = styled.li`
    display: block;
    margin-top: .7rem;
    width: auto;
    height: auto;  
    margin-left: 4px; 

    :hover {
        background-color: #9cc2ff;
        cursor: pointer;
    }
`

const Option = styled.div`
    diplay: inline-block;
    
`

const Wrapper = styled.div`

`



export default class Dropdown extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            primaryOption: this.props.initialOption,
            selectedOption: null,
            testArray: this.props.optionsArray,
        }
    }

    openDropdown = () => {
        this.setState({
            isOpen: true,
        })
    }

    selectOption = (option, index) => {
        let placeHolder = this.state.primaryOption;
        let arr = this.state.testArray;
        arr.splice(index, 1, placeHolder);
        this.setState({
            primaryOption: option,
            
        })
        this.setState({
            isOpen: false,
        })

        this.props.selectOption(option);
        
    }

    setOption = (selectedOption) => {
        this.setState({
            selectedOption: selectedOption,
        })
    }

    closeDropDown = () => {
        if (this.state.isOpen === false){
            this.setState({
                isOpen: false,
            })
        }
        
    }

    render(){
        return(
            <div>
            <Button iconBefore={<Icons name={this.state.primaryOption} />} onClick={this.openDropdown}>
                {this.state.primaryOption}
            </Button>
            

{/*             <Select
                value={this.selectedOption}
                onChange={this.setOption}
                options={options}
                isSearchable={false}
                defaultValue={{ value: this.state.primaryOption, label: <Wrapper><Icons name={this.state.primaryOption} /> {this.state.primaryOption}</Wrapper> }}
            /> */}

            {this.state.isOpen && this.props.optionsArray && (    
                <DropdownMenu>
                    <DropdownItemGroup>
                            {
                                this.state.testArray.map((option, index) => 
                                    <DropdownItem onClick={()=>this.selectOption(option, index)}>
                                        {this.state.selectedOption && (
                                            <Option>
                                            <Icons name="High" />
                                        <Text>{this.state.selectedOption}</Text>
                                            </Option>
                                        )}
                                        {this.state.selectedOption === null && (
                                            <DropdownItem>
                                                <Icons name={option} /> {option}
                                            </DropdownItem>
                                            
                                        )} 
                                        
                                    </DropdownItem>
                            )}
                            
                    </DropdownItemGroup>
                </DropdownMenu> 
                
            )}
            </div>
        );
    }
}