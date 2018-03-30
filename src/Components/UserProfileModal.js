import React, { Component } from 'react'
import {Modal} from 'gestalt'
import UserProfile from './UserProfile'

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
)

export default UserProfileModal
