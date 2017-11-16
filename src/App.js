import React, { Component } from 'react';
import __ from 'lodash'

import API from './API/API'
import Navbar from './Navbar/Navbar';
import Board from './Board/Board';
import Loading from './Loading/Loading';
import Logging from './Logging/Logging'
import './App.css';

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
        this.btnLogoutHandler = this.btnLogoutHandler.bind(this);
    }

    loggingHandler(success: boolean) {
        this.setState({
            isLogged: success || false,
            isLoading: true
        });


        this.getTodos();

    }

    searchHandler(query: string) {

        let found = __.filter(this.state.originalTodos, (t) =>{

            query = __.lowerCase(query);
            let titulo = __.lowerCase(t.titulo);
            let descricao = __.lowerCase(t.descricao);
            
            return titulo.indexOf(query) > -1 || descricao.indexOf(query) > -1;
        });

        this.setState({todos: found});
    }

    btnLogoutHandler() {
        API.logout().subscribe(success => this.setState({isLogged: false}));
    }

    componentDidMount() {

        // check if user is isLogged
        API.getUser().subscribe(user => {

            if (user) {

                this.getTodos();
                this.setState({ isLogged: true });

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
            todos = __.partition(todos, (t) => !t.done);

            this.setState({
                todos: todos[0],
                todosDone: todos[1],
                isLoading: false,
                originalTodos: todos[0]
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
                main = <Board todos={this.state.todos} />;
            }
            else {
                main = <Logging loggingHandler={this.loggingHandler.bind(this)} />
            }

        }

        return (
            <div className="app">
                <div class="demo-layout-waterfall mdl-layout mdl-js-layout">
                    <Navbar searchHandler={this.searchHandler.bind(this)} />
                    <div class="mdl-layout__drawer">
                        <span class="mdl-layout-title">Remind!</span>
                        <nav class="mdl-navigation">
                            <a class="mdl-navigation__link" href="">Link</a>
                            <a class="mdl-navigation__link" href="">Link</a>
                            <a class="mdl-navigation__link" href="">Link</a>
                            <a class="mdl-navigation__link" onClick={this.btnLogoutHandler}>Sair</a>
                        </nav>
                    </div>
                    <main class="mdl-layout__content">
                        <div class="page-content">
                            {main}
                        </div>
                        <footer className='mdl-mega-footer  mdl-typography--text-right'>
                            Copyrights &copy; 2017 built by <strong>Mateus Gabi Moreira</strong>
                        </footer>
                    </main>
                </div>
            </div>
        );
    }
}
