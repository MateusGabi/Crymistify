import React from 'react';
import moment from 'moment';

import { API, Log, Snackbar } from './../Services';
import {FormGroup, Text, Card, CardHeader, Label, Box, coolBackground, Button, Modal, ModalHeader, ModalBody, Input } from '../Components/index';

const initialTodo = {
    titulo: '',
    descricao: '',
    until_at: ''
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
        const newTodo = Object.assign(todo, { titulo: value });

        this.setState({ todo: newTodo })
    }

    setTodoDescricao = value => {
        const { todo } = this.state;
        const newTodo = Object.assign(todo, { descricao: value });

        this.setState({ todo: newTodo })
    }

    setTodoDate = value => {
        const { todo } = this.state;

        const untilAt = moment(value).format()
        const newTodo = Object.assign(todo, { until_at: untilAt });

        this.setState({ todo: newTodo })
    }

    publishTodo = async () => {
        const { todo } = this.state;
        const newTodo = Object.assign(todo, {
            created_at: moment().format(),
        });

        const response = await API.addTodo(newTodo);

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