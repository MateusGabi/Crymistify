import React, { Component } from 'react';
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
            isLoading: true,
            isLogged: false,
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
            this.setState({
                todos: todos,
                isLoading: false
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
                    <Navbar />
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
