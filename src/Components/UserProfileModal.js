/** @format */

import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'gestalt';

import UserProfile from './UserProfile';

const UserProfileModal = ({ closeFunction, logoutFunction }) => (
  <Modal
    accessibilityCloseLabel="close"
    accessibilityModalLabel="View random images"
    heading="Perfil"
    onDismiss={() => closeFunction()}
    size="lg"
  >
    <UserProfile logoutFunction={logoutFunction} />
  </Modal>
);

UserProfileModal.propTypes = {
  closeFunction: PropTypes.func,
  logoutFunction: PropTypes.func,
};

export default UserProfileModal;
