import React from 'react';

import NavItem from './nav-nenu/nav-item';

export const Logo = props => (
    <NavItem to={props.to || '/'} className={props.className || "wb-logo"}>
        {props.children}
    </NavItem>
);
