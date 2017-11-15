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
                if(user) this.props.loggingHandler(true);
            });
    }

    render() {
        return (<p onClick={this.btnLogingWithGoogle}>Entrar com o Google</p>)
    }
}
