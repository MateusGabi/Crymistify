/** @format */

import './App.css';

import { API, Log } from './Services';
import { Board, Footer, Loading, Logging, Sidebar } from './Components';
import React, { Component } from 'react';

import LogRocket from 'logrocket';
import { ThemeProvider } from 'styled-components';
import __ from 'lodash';

const theme = {
  main: 'mediumseagreen',
  fontFamily: 'Muli',
};

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      isLogged: false,
    };
  }

  loggingHandler(success) {
    this.setState({
      isLogged: success || false,
      isLoading: true,
    });
  }

  searchHandler(query) {
    Log.log('search todo', { query: query });

    let found = __.filter(this.state.originalTodos, t => {
      query = __.lowerCase(query);
      let titulo = __.lowerCase(t.titulo);
      let descricao = __.lowerCase(t.descricao);

      return titulo.indexOf(query) > -1 || descricao.indexOf(query) > -1;
    });

    let phrase = `🔎 resultado para "${query}"`;

    if (query) phrase = <span>{phrase}</span>;
    else phrase = null;

    this.setState({ todos: found, searchPhrase: phrase });
  }

  btnLogoutHandler() {
    API.logout().subscribe(success => this.setState({ isLogged: !success }));
  }

  componentDidMount() {
    // check if user is isLogged
    API.getUser().subscribe(user => {
      if (user) {
        this.setState({ isLogged: true, isLoading: false });

        LogRocket.identify(user.uid, {
          name: user.displayName,
          email: user.email,
        });

        Log.setUser(user);
      } else {
        this.setState({ isLoading: false });
      }
    });
  }

  render() {
    let main = null;

    if (this.state.isLoading) {
      main = <Loading />;
    } else {
      if (this.state.isLogged) {
        main = (
          <div>
            <Sidebar
              searchHandler={this.searchHandler.bind(this)}
              logoutHandler={this.btnLogoutHandler.bind(this)}
            />
            <main>
              <Board searchPhrase={this.state.searchPhrase} />
              <Footer />
            </main>
          </div>
        );
      } else {
        main = <Logging loggingHandler={this.loggingHandler.bind(this)} />;
      }
    }

    return <ThemeProvider theme={theme}>{main}</ThemeProvider>;
  }
}
