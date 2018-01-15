import React, { Component } from 'react'

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
            <header className="navbar">
                <div className="container">
                    <span className="brand">Remind! <span role="img" aria-label="">💭</span></span>

                    <div className="menu">
                        <label className="mdl-button mdl-js-button mdl-button--icon"
                            htmlFor="waterfall-exp">
                            <i data-feather="search"></i>
                        </label>
                        <div className="form no-margin">
                            <input className='input' onChange={this.__searchHandler} type="text" name="sample" id="waterfall-exp" />
                        </div>
                        <a className='button' onClick={this.__logoutHandler}> <i className="icon"><i data-feather="search" /></i> Sair</a>
                    </div>
                </div>
            </header>
        );
    }
}
