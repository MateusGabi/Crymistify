/** @format */

import { API, Log, Snackbar } from './../Services';
import {
    Column,
    Heading,
    Tabs,
    TextArea,
    TextField,
} from 'gestalt';
//@ts-check
import React, { Component } from 'react';

import PropTypes from 'prop-types';
import TodoCard from './TodoCard';
import __ from 'lodash';
import moment from 'moment';
import { Card, Text, CardHeader, CardBody, Box, coolBackground, Button, primaryBackground, lightBackground, mangoesBackground } from './index';
import SearchTodoContainer from '../Containers/SearchTodo';
import NewTodoContainer from '../Containers/NewTodo';


const DEFAULT_SHOW = 1
class Lated extends React.Component {

    state = {
        shown: DEFAULT_SHOW,
        shownAll: false
    }

    shownAll = () => {
        this.setState({ shown: this.props.lates.length, shownAll: true })
    }

    resume = () => {
        this.setState({ shown: DEFAULT_SHOW, shownAll: false })
    }

    render() {
        const { shown, shownAll } = this.state;

        const hasLated = this.props.lates.length > 0

        if (!hasLated) {
            return (
                <>
                </>
            )
        }

        return (
            <>
                <Box container style={{ padding: 0, marginTop: '2rem'}} >
                    <Box>
                      <Text bold>Atrasados</Text>
                    </Box>
                    <Box>
                        {shownAll && (
                            <Button onClick={() => this.resume()} variant="outlined" fillHorizontal>
                                <Text italic>Ver menos</Text>
                            </Button>
                        )}
                    </Box>
                </Box>

                {this.props.lates.slice(-1 * shown).map(todo => (
                    <TodoCard key={todo._key} todo={todo} />
                ))}
    
                {this.props.lates.length - shown > 0 && (
                    <Button onClick={() => this.shownAll()} variant="outlined" fillHorizontal>
                        <Text italic>Ver outras {this.props.lates.length - shown} tarefas atrasadas...</Text>
                    </Button>
                )}

                {shownAll && (
                    <Button onClick={() => this.resume()} variant="outlined" fillHorizontal>
                        <Text italic>Ver menos</Text>
                    </Button>
                )}
            </>
        )
    }
}

class Board extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            todos: [],
            lates: [],
        };
    }

    componentDidCatch(error, info) {
        Log.error(error, info);
    }

    async componentDidMount() {
        API.getUser().subscribe(user =>
            this.setState({ userName: user.displayName })
        );

        const todos = await API.getTodos();
        const lates = todos.filter(t => t.late)
        const inTime = todos.filter(t => !t.late)

        this.setState({ todos: inTime, lates })
    }

    getGreeting() {
        let now = new Date();
        let h = now.getHours();

        // 23..7 good hacking
        // 7..12 good morning
        // 12..18 good afternoon
        // 18..23 good evening
        if (h >= 23 || (h >= 0 && h < 7)) {
            return (
                <span>
                    Bom hacking, <strong>{this.state.userName}</strong>!{' '}
                    <span role="img" aria-label="nerd">
                        🤓
                    </span>
                </span>
            );
        } else if (h >= 7 && h < 12) {
            return (
                <span>
                    Bom dia, <strong>{this.state.userName}</strong>!{' '}
                    <span role="img" aria-label="peace">
                        ✌
                    </span>
                </span>
            );
        } else if (h >= 12 && h < 18) {
            return (
                <span>
                    Boa tarde, <strong>{this.state.userName}</strong>!{' '}
                    <span role="img" aria-label="peace">
                        🤗
                    </span>
                </span>
            );
        } else if (h >= 18 && h < 23) {
            return (
                <span>
                    Boa noite, <strong>{this.state.userName}</strong>!{' '}
                    <span role="img" aria-label="peace">
                        👋
                    </span>
                </span>
            );
        }
    }

    render() {
        let message = '';

        if (this.state.todos.length < 1) {
            message = (
                <Card>
                    <CardHeader>
                        <Text bold>Não encontramos afazeres com esse nome.</Text>
                    </CardHeader>
                </Card>
            );
        }

        return (
            <div>
                <div style={{ display: 'flex', 
    alignItems: 'stretch',
    flexWrap: 'wrap'}}>
                        <Card style={{
                            ...coolBackground,
                            padding: '4rem 1rem',
                            flex: 3, minWidth: 'fit-content'
                        }}>
                            <Text variant="title" bold inverted>{this.props.searchPhrase || this.getGreeting()}</Text>
                        </Card>
                        <Card ghost noGutters style={{ flex: 1, minWidth: 'fit-content'}}>
                            <NewTodoContainer />
                        </Card>
                        <Card ghost noGutters style={{ flex: 1, minWidth: 'fit-content'}}>
                            <SearchTodoContainer />
                        </Card>
                        <Card ghost noGutters style={{ flex: 1, minWidth: 'fit-content'}}>
                            <Button variant="outlined" fillHorizontal>
                                <Text>Feitas 🎉</Text>
                            </Button>
                        </Card>
                </div>
                <Card ghost noGutters>
                    <CardHeader>
                        <Text variant="subtitle" cursive>Meus Afazeres</Text>
                    </CardHeader>
                    <CardBody>
                        <Lated lates={this.state.lates} />

                        <Text bold style={{ marginTop: '2rem' }}>Próximos</Text>
                        {this.state.todos.map(todo => (
                            <TodoCard key={todo._key} todo={todo} />
                        ))}
                        {message}
                    </CardBody>
                </Card>
            </div>
        );
    }
}

Board.propTypes = {
    searchPhrase: PropTypes.func,
};

export default Board;
