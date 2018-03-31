import React, { Component } from 'react';
import { Heading, Box, SearchField, IconButton } from 'gestalt';

import UserProfileModal from './UserProfileModal';

export default class Navbar extends Component {
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
  __logoutHandler(event) {
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
      <div>
        <Box
          color="white"
          shape="rounded"
          padding={3}
          display="flex"
          direction="row"
          alignItems="center"
        >
          <Box padding={3}>
            <Heading size="xs">
              Crymistify{' '}
              <span role="img" aria-label="choro">
                😭
              </span>
            </Heading>
          </Box>
          <Box flex="grow" paddingX={2}>
            <SearchField
              accessibilityLabel="Demo Search Field"
              id="searchField"
              onChange={({ value }) => this.__searchHandler(value)}
              placeholder="Buscar"
              value={this.state.searchValue}
            />
          </Box>
          <Box paddingX={2}>
            <IconButton
              onClick={() => this.openUPModal()}
              accessibilityLabel="Profile"
              icon="person"
              size="md"
            />
          </Box>
        </Box>

        {this.state.profileModalisOpen && (
          <UserProfileModal
            closeFunction={this.closeUPModal.bind(this)}
            logoutFunction={this.__logoutHandler.bind(this)}
          />
        )}
      </div>
    );
  }
}
