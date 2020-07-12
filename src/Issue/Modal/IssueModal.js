import React, { Component } from 'react';
import ModalDialog, { ModalTransition } from '@atlaskit/modal-dialog';
//import styled from 'styled-components';

import IssueType from './IssueType';
import Summary from './Summary';
import { Description } from './Description';


export default class IssueModal extends Component{
    constructor(props) {
        super(props);

        this.secondaryAction = this.secondaryAction.bind(this);
    }

    secondaryAction() {
        this.props.close = false;
    }

    render() {
        const actions = [
            { text: 'Close', onClick: this.close },
            { text: 'Secondary Action', onClick: this.props.close },
          ];

        return(
            <div></div>
        );
    }
    
}