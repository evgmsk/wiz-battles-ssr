/**
 * project WizBattle
 */
import React from 'react';
import { Link } from 'react-router-dom';
import './nav-item.scss';

const NavItem = (props) => {
    const Icon = props.icon;
    return (
        <Link
            to={props.to}
            className={props.className  || 'nav-menu-item'}
        >
            {props.children}{Icon && <Icon className="nav-icon"/>}
        </Link>
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
