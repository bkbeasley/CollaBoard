import React, { useState } from 'react';

import { push as Menu } from 'react-burger-menu';
import './assets/css/side-bar.css';

import styled from 'styled-components';

const Link = styled.a`

    :hover {
        color: #ffffff;
        text-decoration: none;
    }
`

 function SideBar() {

        return (
            <div id="outer-container">
                <Menu pageWrapId={ "page-wrap" } disableAutoFocus />
                    <main id="page-wrap">
                    <Link id="home" className="menu-item" href="/">Home</Link>
                    </main>
                    
            </div>
        )
}

export default SideBar;