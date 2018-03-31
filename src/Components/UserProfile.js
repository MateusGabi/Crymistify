/** @format */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { API } from './../Services';

import { Avatar, Box, Button, Column, Divider, Heading, Text } from 'gestalt';

class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            displayName: 'User name',
            email: 'user@email.com',
            imgURI: 'http://some.link',
            emailVerified: false,
        };
    }

    componentDidMount() {
        API.getUser().subscribe(user => {
            this.setState({
                displayName: user.displayName,
                email: user.email,
                imgURI: user.photoURL,
                emailVerified: user.emailVerified,
            });
        });
    }

    render() {
        return [
            <Box paddingY={2} paddingX={5} key="0">
                <Box display="flex" direction="row">
                    <Column span={2}>
                        <Avatar
                            name={this.state.displayName}
                            size="lg"
                            src={this.state.imgURI}
                            verified={this.state.emailVerified}
                        />
                    </Column>
                    <Column span={10}>
                        <Heading size="sm">{this.state.displayName}</Heading>
                        <Text>{this.state.email}</Text>
                    </Column>
                </Box>

                <Divider />

                <Box display="flex" direction="row">
                    <Button text="Sair" onClick={this.props.logoutFunction} />
                </Box>
            </Box>,
        ];
    }
}

UserProfile.propTypes = {
    logoutFunction: PropTypes.func,
};

export default UserProfile;
