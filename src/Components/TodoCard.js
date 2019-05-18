/** @format */

import React, { Component } from 'react';

import { Avatar } from 'gestalt';
import Icon from './../Components/Icon';
import Log from './../Services/Log';
import PropTypes from 'prop-types';
import Service from './../Services/API';
import SnackbarService from './../Services/Snackbar';
import moment from 'moment';
import styled from 'styled-components';

const Button = styled.button`
    background: rgb(57,255,51);
    background: linear-gradient(45deg, #2196F3 30%, #21CBF3 90%);
    border: 0;
    padding: .5rem 2rem;
    border-radius: 1rem;
    color: white;
    text-transform: uppercase;
`;

const Text = styled.p`
    font-family: ${props => props.theme.fontFamily}, Arial, sans-serif;
    font-size: 1rem;
    margin: 0.2rem 0;
    font-style: ${props => (props.italic ? 'italic' : 'initial')};
    font-weight: ${props => (props.bold ? 'bold' : 'initial')};
    letter-spacing: .025rem;
`;

const Box = styled.div``;

const TimeToDone = styled.div`
    display: flex;
    align-items: center;
`;

const TodoCardWrapper = styled.div`
    background: #f5f5f542;
    border-radius: 1rem;
    box-shadow: .5rem .5rem 1rem 0 #e1e1e1;
    padding: 1rem;
    margin: 1rem;
`;

const TodoCardHeader = styled.div`
    display: flex;
    align-items: center;
`;

const TodoCardFooter = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const timeToDone = time => {
    if (time) {
        return (
            <TimeToDone>
                <Text>{time}</Text>
            </TimeToDone>
        );
    } else {
        return [];
    }
};

class TodoCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todo: this.props.todo,
            created_at: 'calculando...',
            to_date: 'calculando...',
            backgroundColor: '#d0ccd0',
            iconName: this.props.todo.done ? 'check-circle' : 'circle',
        };

        this.handleMarkAsDone = this.handleMarkAsDone.bind(this);
        this.handleEditTitle = this.handleEditTitle.bind(this);
        this.handleEditDescription = this.handleEditDescription.bind(this);
        this.handleClickEditData = this.handleClickEditData.bind(this);
        this.showSnackbar = this.showSnackbar.bind(this);
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.coolFormatDate();
            this.setBackgroundColor();
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    handleMarkAsDone() {
        let _confirm = window.confirm(
            `Marcar ${this.state.todo.titulo} como feito ?`
        );
        if (_confirm) {
            Service.remover(this.state.todo);
            SnackbarService.showMessage(
                `Item '${this.state.todo.titulo}' removido!'`
            );

            Log.log('user marked a todo as done', {
                todo_key: this.state.todo._key,
            });
        } else {
            Log.log('user give up to mark a todo as done', {
                todo_key: this.state.todo._key,
            });
        }
    }

    handleEditTitle(event) {
        this.setState({
            todo: { titulo: event.target.value },
        });
        Log.log('user set todo title', { todo_key: this.state.todo._key });

        // possível grande demeon aqui!!
        // essa coisa de que a cada type salva no banco não é bom!
        Service.editTodo(this.state.todo);
    }

    handleEditDescription(event) {
        this.setState({
            todo: { descricao: event.target.value },
        });

        Log.log('user set todo description', {
            todo_key: this.state.todo._key,
        });

        Service.editTodo(this.state.todo);
    }

    handleClickEditData() {
        SnackbarService.showMessage(
            'Uhh... Nos desculpe, mas essa função não disponível.'
        );
    }

    showSnackbar() {
        SnackbarService.showMessage(
            `Item '${this.state.todo.titulo}' editado!`
        );
    }

    coolFormatDate() {
        let diff = moment(this.state.todo.created_at).fromNow();
        let diff1 = moment(this.state.todo.until_at).fromNow();
        return this.setState({ created_at: diff, to_date: diff1 });
    }

    setBackgroundColor() {
        let oneday = 1000 * 60 * 60 * 24;
        let now = moment().valueOf();
        let day_to_end = moment(this.state.todo.until_at).valueOf();

        let rest = Math.round((day_to_end - now) / oneday).valueOf();

        let color = '#fff';

        if (rest <= 0) {
            color = '#000';

            if (this.state.todo.until_at === undefined) {
                this.setState({ to_date: undefined });
                color = '#fff';
            }
        } else if (rest > 0 && rest <= 3) {
            color = '#dd2c00';
        } else if (rest > 3 && rest <= 5) {
            color = '#ff6d00';
        } else if (rest > 5 && rest <= 7) {
            color = '#ffd600';
        }

        if (this.state.todo.done) {
            color = 'transparent';
        }

        this.setState({ backgroundColor: color });
    }

    render() {
        let _timeToDone = timeToDone(this.state.to_date);

        let done_text = this.state.todo.done
            ? 'Marcar como não Feito'
            : 'Marcar como Feito';

        let style = this.state.todo.done
            ? { textDecoration: 'line-through' }
            : {};

        return (
            <TodoCardWrapper>
                <TodoCardHeader>
                    <Text bold>{this.props.todo.titulo}</Text>
                </TodoCardHeader>
                <Box>
                    <Box paddingY={1}>
                        <Text>
                            <span style={style}>
                                {this.props.todo.descricao}
                            </span>
                        </Text>
                    </Box>
                </Box>
                <TodoCardFooter>
                    {!this.state.todo.done && (
                        <TimeToDone>
                            <Text italic>{this.state.to_date}</Text>
                        </TimeToDone>
                    )}
                    <Button onClick={this.handleMarkAsDone}>
                        <Text>Feito</Text>
                    </Button>
                </TodoCardFooter>
            </TodoCardWrapper>
        );
    }
}

TodoCard.propTypes = {
    todo: PropTypes.object,
};

export default TodoCard;
