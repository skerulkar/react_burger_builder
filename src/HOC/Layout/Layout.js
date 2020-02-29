import React , { Component } from 'react';
import Auxillary from '../Auxillary/Auxillary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
    state = {
        showSidedrawer: false
    }
    sideDrawerClosedHandler = () => {
        this.setState({showSidedrawer: false}) 
    }

    sideDrawerToggleHandler = () => {

        this.setState((prevState) => {
            return {
                showSidedrawer: !prevState.showSidedrawer
            }
        });
    }

    render () {
        return (
            <Auxillary>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer 
                    open={this.state.showSidedrawer} 
                    closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxillary>
        )
    }
}    

export default Layout;