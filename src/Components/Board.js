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
        shown: DEFAULT_SHOW
    }

    shownAll = () => {
        this.setState({ shown: this.props.lates.length })
    }

    resume = () => {
        this.setState({ shown: DEFAULT_SHOW })
    }

    render() {
        const { shown } = this.state;

        return (
            <>
                <Box container style={{ padding: 0, marginTop: '2rem'}} >
                    <Box>
                      <Text bold>Atrasados</Text>
                    </Box>
                    <Box>
                        {this.props.lates.length === shown && (
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
                <Card style={{
                    ...primaryBackground,
                    padding: '4rem 1rem'
                }}>
                    <Text variant="title" bold inverted>{this.props.searchPhrase || this.getGreeting()}</Text>
                </Card>
                <Box container horizontalScroll style={{ padding: '0 1rem'}}>
                    {false && <Box item noGutters>
                        <SearchTodoContainer />
                    </Box>}
                    <Box item>                        
                        <NewTodoContainer />
                    </Box>
                    {false && <Box item noGutters style={{ paddingRight: '1rem'}}>
                        <Button style={coolBackground}>
                            <Text inverted>Feitos</Text>
                        </Button>
                    </Box>}
                </Box>
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
