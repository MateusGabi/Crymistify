import React, { Component } from 'react'
import API from './../API/API'
import SnackbarService from './../Services/Snackbar'


import { Box, Button, Heading, Icon } from 'gestalt'

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
            <Box
                display="flex"
                direction="column"
                justifyContent="center"
                alignItems="center"
                width='100vw'
                height='100vh'
            >
                <div>
                    <Heading size="lg">Bem vindo de volta!</Heading>
                </div>
                <div>
                    <Button
                        color="red"
                        text="Entrar com o Google"
                        onClick={() => this.btnLogingWithGoogle()}
                        inline
                    />
                </div>
            </Box>
        )
    }
}
