import React from 'react';
import {FormGroup, Text, Card, CardHeader, Label, Box, coolBackground, Button, Modal, ModalHeader, ModalBody, Input } from '../Components/index';

class NewTodoContainer extends React.Component {

    state = {
        open: false
    }

    openModal = () => this.setState({ open: true})
    closeModal = () => this.setState({ open: false})

    render() {
        return (
            <>
                <Button style={coolBackground} onClick={() => this.openModal()}>
                    <Text inverted>Adicionar</Text>
                </Button>
                {this.state.open && <Modal style={coolBackground}>
                    <ModalHeader>
                        <Box container fixed fillHorizontal>
                            <Box item>
                                <Button variant="text" onClick={() => this.closeModal()} style={{padding: 0}}>
                                    <Text inverted>👈 Voltar</Text>
                                </Button>
                            </Box>
                        </Box>
                        <Box style={{ height: 90}}></Box>
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label>Tenho que</Label>
                            <Input placeholder="Título" fillHorizontal />
                        </FormGroup>

                        <FormGroup>
                            <Label>da seguinte forma</Label>
                            <Input placeholder="Descrição" fillHorizontal />
                        </FormGroup>

                        <FormGroup>
                            <Label>até o dia</Label>
                            <Input type="datetime-local" fillHorizontal />
                        </FormGroup>

                        <Button fillHorizontal>
                            <Text inverted bold>Eu vou fazer isso! 🚀👉</Text>
                        </Button>
                    </ModalBody>
                </Modal>}
            </>
        )
    }
}

export default NewTodoContainer