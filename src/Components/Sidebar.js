/** @format */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Heading, SearchField, IconButton } from 'gestalt';

import { Box, Text } from './index'

import UserProfileModal from './UserProfileModal';

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ' ',
            profileModalisOpen: false,
        };
    }

    __searchHandler(value) {
        this.props.searchHandler(value);
    }

    __logoutHandler() {
        this.props.logoutHandler();
    }

    openUPModal() {
        this.setState({ profileModalisOpen: true });
    }

    closeUPModal() {
        this.setState({ profileModalisOpen: false });
    }

    render() {
        return (
            <>
                <Box container fixed fillHorizontal style={{
                    background: 'rgba(255, 255, 255, 0.75)',
                    backdropFilter: 'blur(5px)'
                }}>
                    <Box item>
                        <Text variant="title" cursive>
                            Crymistify
                        </Text>
                    </Box>
                    <Box item>
                        <IconButton
                            onClick={() => this.openUPModal()}
                            accessibilityLabel="Profile"
                            icon="person"
                            size="md"
                        />
                    </Box>
                </Box>
                <Box style={{ height: 90}}></Box>
                <Box item>
                        <SearchField
                            accessibilityLabel="Demo Search Field"
                            id="searchField"
                            onChange={({ value }) =>
                                this.__searchHandler(value)
                            }
                            placeholder="Buscar"
                            value={this.state.searchValue}
                        />
                    </Box>

                {this.state.profileModalisOpen && (
                    <UserProfileModal
                        closeFunction={this.closeUPModal.bind(this)}
                        logoutFunction={this.__logoutHandler.bind(this)}
                    />
                )}
            </>
        );
    }
}

Navbar.propTypes = {
    searchHandler: PropTypes.func,
    logoutHandler: PropTypes.func,
};

export default Navbar;
