import React, { Component } from 'react'
import API from './../API/API'
import SnackbarService from './../Services/Snackbar'
import Icon from './../Icon/Icon'

export default class Logging extends Component {

    constructor(props) {
        super(props);

        this.btnLogingWithGoogle = this.btnLogingWithGoogle.bind(this);
    }

    btnLogingWithGoogle() {
        API
            .loginWithGoogle()
            .subscribe(user => {
                if (user) this.props.loggingHandler(true);
            });
    }

    render() {
        return (
            <div style={{ height: 'calc(100vh - 240px)' }} className='layout vertical center-center'>
                <div>
                    <h3 class="text-ghost">Welcome back!</h3>
                </div>
                <div>
                    <button onClick={this.btnLogingWithGoogle} className="button button-google">
                        <Icon name='user' /> Login with Google
                    </button>
                </div>
            </div>
        )
    }
}
