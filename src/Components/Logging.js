/** @format */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { API } from './../Services';

import { Box, Button, Heading } from 'gestalt';

class Logging extends Component {
    constructor(props) {
        super(props);

        this.btnLogingWithGoogle = this.btnLogingWithGoogle.bind(this);
    }

    btnLogingWithGoogle() {
        API.loginWithGoogle().subscribe(user => {
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
                width="100vw"
                height="100vh"
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
        );
    }
}

Logging.propTypes = {
    loggingHandler: PropTypes.func,
};

export default Logging;
