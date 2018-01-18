import React, { Component } from 'react'
import Icon from './../Icon/Icon'

export default class Navbar extends Component {

    constructor(props) {
        super(props);

        this.__searchHandler = this.__searchHandler.bind(this)
        this.__logoutHandler = this.__logoutHandler.bind(this)
    }

    __searchHandler(event) {
        this.props.searchHandler(event.target.value);
    }
    __logoutHandler(event) {
        this.props.logoutHandler(event.target.value);
    }

    render() {

        return (
                <div className="grid-cell cell--1of4" style={{backgroundColor: '#fdfdfd', borderRadius: '0px', borderRight: '1px solid #ccc', margin: '0px'}}>
                    <span className="brand">Remind! <span role="img" aria-label="">💭</span></span>

                    <div className="menu">
                        <div className="form no-margin">
                            <Icon name='search' />
                            <input className='input' onChange={this.__searchHandler} type="text" name="sample" id="waterfall-exp" />
                        </div>
                        <a className='button' onClick={this.__logoutHandler}> <Icon name='log-out' /> Sair</a>
                    </div>
                </div>
        );
    }
}
