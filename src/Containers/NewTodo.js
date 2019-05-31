import React from 'react';
import moment from 'moment';

import { API, Log, Snackbar } from './../Services';
import {FormGroup, Text, Card, CardHeader, Label, Box, coolBackground, Button, Modal, ModalHeader, ModalBody, Input, ArrowBack } from '../Components/index';

const initialTodo = {
    title: '',
    description: '',
    expire_in: ''
}

class NewTodoContainer extends React.Component {

    state = {
        open: false,
        todo: initialTodo
    }

    openModal = () => this.setState({ open: true})
    closeModal = () => this.setState({ open: false})

    setTodoTitulo = value => {
        const { todo } = this.state;
        const newTodo = Object.assign(todo, { title: value });

        this.setState({ todo: newTodo })
    }

    setTodoDescricao = value => {
        const { todo } = this.state;
        const newTodo = Object.assign(todo, { description: value });

        this.setState({ todo: newTodo })
    }

    setTodoDate = value => {
        const { todo } = this.state;

        const untilAt = moment(value).format()
        const newTodo = Object.assign(todo, { expire_in: untilAt });

        this.setState({ todo: newTodo })
    }

    publishTodo = async () => {
        const { todo } = this.state;

        const response = await API.addTodo(todo);

        if (response) {
            Snackbar.showMessage('Item adicionado 😉');
            this.closeModal()
        }
        else {
            Snackbar.showMessage('Um erro ocorreu 😔');
        }
    }

    render() {
        return (
            <>
                <Button fillHorizontal variant="outlined" onClick={() => this.openModal()}>
                    <Text inverted>Novo afazer 🆕</Text>
                </Button>
                {this.state.open && <Modal style={coolBackground}>
                    <ModalHeader>
                        <Box noGutters container fixed fillHorizontal>
                            <Box noGutters item style={{    background: "#0000002e",
    padding: '0 1rem',
    borderRadius: '1rem'}}>
                                <Button variant="text" onClick={() => this.closeModal()} style={{padding: 0}}>
                                    <Text inverted>I'm out!</Text>
                                </Button>
                            </Box>
                        </Box>
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label>Tenho que</Label>
                            <Input placeholder="Título" fillHorizontal onChange={e => this.setTodoTitulo(e.target.value)} />
                        </FormGroup>

                        <FormGroup>
                            <Label>da seguinte forma</Label>
                            <Input placeholder="Descrição" fillHorizontal onChange={e => this.setTodoDescricao(e.target.value)} />
                        </FormGroup>

                        <FormGroup>
                            <Label>até o dia</Label>
                            <Input type="datetime-local" fillHorizontal onChange={e => this.setTodoDate(e.target.value)} />
                        </FormGroup>

                        <Button fillHorizontal onClick={() => this.publishTodo()}>
                            <Text inverted bold>Eu vou fazer isso! 🚀👉</Text>
                        </Button>
                    </ModalBody>
                </Modal>}
            </>
        )
    }
}

export default NewTodoContainer