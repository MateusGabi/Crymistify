/** @format */

import React from 'react';
import moment from 'moment';

import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

import { API, Log, Snackbar } from './../Services';
import {
  FormGroup,
  Text,
  Card,
  CardHeader,
  Label,
  Box,
  coolBackground,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  ArrowBack,
} from '../Components/index';

const CREATE_TODO_MUTATION = gql`
  mutation AddTodo(
    $title: String!
    $description: String
    $expireIn: String
    $tags: [String!]
  ) {
    addTodo(
      title: $title
      description: $description
      expireIn: $expireIn
      tags: $tags
    ) {
      ID
    }
  }
`;

const initialTodo = {
  title: '',
  description: '',
  expire_in: '',
  tags: [],
};

class NewTodoContainer extends React.Component {
  state = {
    open: false,
    todo: initialTodo,
  };

  openModal = () => this.setState({ open: true });
  closeModal = () => this.setState({ open: false });

  setTodoTitulo = value => {
    const { todo } = this.state;
    const newTodo = Object.assign(todo, { title: value });

    this.setState({ todo: newTodo });
  };

  setTodoDescricao = value => {
    const { todo } = this.state;
    const newTodo = Object.assign(todo, { description: value });

    this.setState({ todo: newTodo });
  };

  setTodoTags = value => {
    const { todo } = this.state;
    const newTodo = Object.assign(todo, { tags: value.split(',') });

    this.setState({ todo: newTodo });
  };

  setTodoDate = value => {
    const { todo } = this.state;

    const untilAt = moment(value).format();
    const newTodo = Object.assign(todo, { expire_in: untilAt });

    this.setState({ todo: newTodo });
  };

  publishTodo = async callback => {
    const { todo } = this.state;

    // const response = await API.addTodo(todo);

    if (callback instanceof Function)
      callback({
        variables: {
          title: todo.title,
          description: todo.description,
          expireIn: todo.expire_in,
          tags: todo.tags,
        },
      });

    // if (response) {
    //   Snackbar.showMessage('Item adicionado 😉');
    //   this.closeModal();
    // } else {
    //   Snackbar.showMessage('Um erro ocorreu 😔');
    // }
  };

  render() {
    return (
      <>
        <Button
          fillHorizontal
          variant="outlined"
          onClick={() => this.openModal()}
        >
          <Text inverted>Novo afazer 🆕</Text>
        </Button>
        {this.state.open && (
          <Modal style={coolBackground}>
            <ModalHeader>
              <Box noGutters container fixed fillHorizontal>
                <Box
                  noGutters
                  item
                  style={{
                    background: '#0000002e',
                    padding: '0 1rem',
                    borderRadius: '1rem',
                  }}
                >
                  <Button
                    variant="text"
                    onClick={() => this.closeModal()}
                    style={{ padding: 0 }}
                  >
                    <Text inverted>I'm out!</Text>
                  </Button>
                </Box>
              </Box>
            </ModalHeader>
            <ModalBody>
              <Mutation mutation={CREATE_TODO_MUTATION}>
                {(createTodo, { data }) => (
                  <>
                    <FormGroup>
                      <Label>Tenho que</Label>
                      <Input
                        placeholder="Título"
                        fillHorizontal
                        onChange={e => this.setTodoTitulo(e.target.value)}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label>da seguinte forma</Label>
                      <Input
                        placeholder="Descrição"
                        fillHorizontal
                        onChange={e => this.setTodoDescricao(e.target.value)}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label>marcadores</Label>
                      <Input
                        placeholder="Trabalho, Projeto Alpha, Protótipo"
                        fillHorizontal
                        onChange={e => this.setTodoTags(e.target.value)}
                      />
                      <Text italic variant="small">
                        utilize a vírgula para separar marcadores
                      </Text>
                    </FormGroup>

                    <FormGroup>
                      <Label>até o dia</Label>
                      <Input
                        type="datetime-local"
                        fillHorizontal
                        onChange={e => this.setTodoDate(e.target.value)}
                      />
                    </FormGroup>

                    <Button
                      fillHorizontal
                      onClick={() => this.publishTodo(createTodo)}
                    >
                      <Text inverted bold>
                        Eu vou fazer isso! 🚀👉
                      </Text>
                    </Button>
                  </>
                )}
              </Mutation>
            </ModalBody>
          </Modal>
        )}
      </>
    );
  }
}

export default NewTodoContainer;
