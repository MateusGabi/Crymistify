
import React, { Component } from 'react';
import __ from 'lodash'
import LogRocket from 'logrocket'

import { Text } from 'gestalt'

import {
    API,
    Log
} from './Services'

import {
    Board,
    Footer,
    Loading,
    Logging,
    Sidebar,
    Snackbar
} from './Components'

import './App.css'

export default class App extends Component {

    constructor() {
        super();

        this.state = {
            todos: [],
            todosDone: [],
            isLoading: true,
            isLogged: false,
            originalTodos: []
        };

        // this.loggingHandler = this.loggingHandler.bind(this);
        // this.btnLogoutHandler = this.btnLogoutHandler.bind(this);
    }

    loggingHandler(success: boolean) {
        this.setState({
            isLogged: success || false,
            isLoading: true
        });


        this.getTodos();

    }

    searchHandler(query: string) {

        Log.log('search todo', { query: query });

        let found = __.filter(this.state.originalTodos, (t) => {

            query = __.lowerCase(query);
            let titulo = __.lowerCase(t.titulo);
            let descricao = __.lowerCase(t.descricao);

            return titulo.indexOf(query) > -1 || descricao.indexOf(query) > -1;
        });

        let phrase = `🔎 resultado para "${query}"`

        if(query) phrase = (<span>{phrase}</span>)
        else phrase = null

        this.setState({ todos: found, searchPhrase: phrase });
    }

    btnLogoutHandler() {
        API.logout().subscribe(success => this.setState({ isLogged: false }));
    }

    componentDidMount() {

        // check if user is isLogged
        API.getUser().subscribe(user => {

            if (user) {

                this.getTodos();
                this.setState({ isLogged: true });

                LogRocket.identify(user.uid, {
                    name: user.displayName,
                    email: user.email
                });

                Log.setUser(user);

            } else {
                this.setState({ isLoading: false });
            }
        });




    }

    getTodos() {
        API.getTodos().subscribe(todos => {

            // do a partition in array
            // return[0] => true
            // return[1] => false
            // todos = __.partition(todos, (t) => !t.done);

            this.setState({
                todos: todos,
                isLoading: false,
                originalTodos: todos
            });
        });
    }

    render() {

        let main = null;

        if (this.state.isLoading) {
            main = <Loading />;
        }
        else {

            if (this.state.isLogged) {
                main = (
                    <div>
                        <Sidebar searchHandler={this.searchHandler.bind(this)} logoutHandler={this.btnLogoutHandler.bind(this)} />
                        <main>
                            <Board todos={this.state.todos} searchPhrase={this.state.searchPhrase} />
                            <Footer />
                        </main>
                    </div>);
            }
            else {
                main = <Logging loggingHandler={this.loggingHandler.bind(this)} />
            }

        }

        return [main];
    }
}
