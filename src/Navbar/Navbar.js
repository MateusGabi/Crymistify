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
            <header class="navbar">
                <div class="container">
                    <span class="brand">Remind! <span role="img" aria-label="">💭</span></span>

                    <div class="menu">
                        <label class="mdl-button mdl-js-button mdl-button--icon"
                            htmlFor="waterfall-exp">
                            <i data-feather="search"></i>
                        </label>
                        <div class="mdl-textfield__expandable-holder">
                            <input onChange={this.__searchHandler} class="mdl-textfield__input" type="text" name="sample" id="waterfall-exp" />
                        </div>
                        <a className='button' onClick={this.__logoutHandler}> <i data-feather="search"></i> Sair</a>
                    </div>
                </div>
            </header>
        );
    }
}
