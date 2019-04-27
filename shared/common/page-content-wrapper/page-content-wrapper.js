/**
 * project new-wiz-bat
 */
import React from 'react';

const Page = props => {
    const {className, title, titleClassName} = props;
    return (
        <section className={`page ${props.className}`}>
            {title && <h1 className={titleClassName} >{title}</h1>}
            {props.children}
        </section>
    )
};

export default Page;
