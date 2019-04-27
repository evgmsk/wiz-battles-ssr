/**
 * project WizBattle
 */
import React from 'react';
import { NavLink } from 'react-router-dom';
import './nav-item.scss';

const NavItem = (props) => {
    const Icon = props.icon;
    return (
        <NavLink
            to={props.to}
            className={props.className  || 'nav-menu-item'}
            exact
        >
            {props.children}{Icon && <Icon className="nav-icon"/>}
        </NavLink>
    );
};

export const SpecialLink = props => {
    const {href, className, children} = props;
    return (
        <a href={href} className={className || 'nav-menu-item'}>
            {children}
        </a>
    )
};

export default NavItem;
