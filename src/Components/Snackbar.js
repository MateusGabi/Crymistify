import React, { Component } from 'react'

export default class Snackbar extends Component {

    render() {

        return (<div id="demo-toast-example" className="mdl-js-snackbar mdl-snackbar">
            <div className="mdl-snackbar__text"></div>
            <button className="mdl-snackbar__action" type="button"></button>
        </div>)

    }

}