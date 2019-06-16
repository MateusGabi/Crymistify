/** @format */

import React from 'react';
import {
  Text,
  Box,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from '../Components/index';

class SearchTodoContainer extends React.Component {
  state = {
    open: false,
  };

  openModal = () => this.setState({ open: true });

  render() {
    return (
      <>
        <Button
          fillHorizontal
          variant="outlined"
          onClick={() => this.openModal()}
        >
          <Text inverted>Buscar 🔍</Text>
        </Button>
        {this.state.open && (
          <Modal>
            <ModalHeader>
              <Box container fixed fillHorizontal>
                <Box item>
                  <Text>fechar</Text>
                </Box>
                <Box item>
                  <Text cursive variant="subtitle">
                    Buscar
                  </Text>
                </Box>
              </Box>
              <Box style={{ height: 90 }} />
            </ModalHeader>
            <ModalBody>....</ModalBody>
          </Modal>
        )}
      </>
    );
  }
}

export default SearchTodoContainer;
