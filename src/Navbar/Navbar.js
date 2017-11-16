import React, { Component } from 'react'

export default class Navbar extends Component {

    constructor(props) {
        super(props);

        this.__searchHandler = this.__searchHandler.bind(this);
    }

    __searchHandler(event) {
        this.props.searchHandler(event.target.value);
    }

    render() {

        return (
            <header class="mdl-layout__header mdl-layout__header--waterfall">
                <div class="mdl-layout__header-row">
                    <span class="mdl-layout-title">Remind! <span role="img" aria-label="">💭</span></span>
                    <div class="mdl-layout-spacer"></div>
                    <div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable mdl-textfield--floating-label mdl-textfield--align-right">
                        <label class="mdl-button mdl-js-button mdl-button--icon"
                        htmlFor="waterfall-exp">
                            <i class="material-icons">search</i>
                        </label>
                        <div class="mdl-textfield__expandable-holder">
                            <input onChange={this.__searchHandler} class="mdl-textfield__input" type="text" name="sample" id="waterfall-exp" />
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}
