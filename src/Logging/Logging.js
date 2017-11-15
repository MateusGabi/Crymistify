import React, { Component } from 'react'
import API from './../API/API'

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
            <div className='Loading'>
                <div>
                    <h3>Welcome back!</h3>
                </div>
                <div>
                <button onClick={this.btnLogingWithGoogle} className="loginBtn loginBtn--google">
                    Login with Google
                </button>
                <br/>
                    <button onClick={(e) => alert('Not avaible yet :c')} className="loginBtn loginBtn--facebook">
                        Login with Facebook
                    </button>
                </div>
            </div>
        )
    }
}
