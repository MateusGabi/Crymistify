import React, { Component } from 'react'
import {Modal} from 'gestalt'
import UserProfile from './../UserProfile/UserProfile'

const UserProfileModal = ({ closeFunction }) => (
    <Modal
      accessibilityCloseLabel="close"
      accessibilityModalLabel="View random images"
      heading="Perfil"
      onDismiss={() => closeFunction()}
      size="lg"
    >
      <UserProfile />
    </Modal>
)

export default UserProfileModal
