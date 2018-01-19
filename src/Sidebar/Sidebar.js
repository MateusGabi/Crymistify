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
                <div className="grid-cell cell--1of6" style={{borderRadius: '0px', borderRight: '1px solid #ccc', margin: '0px'}}>
                    <div className='layout vertical justified' style={{height: '95vh'}}>
                        <div>
                            <span className="brand h4">Remind! <span role="img" aria-label="">💭</span></span>

                            <div className="menu">
                                <div className="form no-margin">
                                    <input className='input' onChange={this.__searchHandler} type="text" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="">
                                <a className='button' onClick={this.__logoutHandler}> <Icon name='log-out' /> Sair</a>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}
