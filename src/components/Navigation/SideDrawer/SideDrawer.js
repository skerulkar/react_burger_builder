import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxillary from '../../../HOC/Auxillary/Auxillary'

const sideDrawer = (props) => {
    let attachClasses = [classes.SideDrawer, classes.Close]
    if (props.open) {
        attachClasses = [classes.SideDrawer, classes.Open]
    }
    return (
        <Auxillary>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Auxillary>
    );
};

export default sideDrawer;