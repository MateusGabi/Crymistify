/** @format */

import { API, Log, Snackbar } from './../Services';
//@ts-check
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import PropTypes from 'prop-types';
import TodoCard from './TodoCard';
import __ from 'lodash';
import {
  Card,
  Text,
  CardHeader,
  CardBody,
  Box,
  coolBackground,
  Button,
  primaryBackground,
  lightBackground,
  mangoesBackground,
} from './index';
import SearchTodoContainer from '../Containers/SearchTodo';
import NewTodoContainer from '../Containers/NewTodo';
import LatedTodos from './LatedTodos';
import InTimeTodos from './InTimeTodos';

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
    const lates = todos.filter(t => t.late);
    const inTime = todos.filter(t => !t.late);

    this.setState({ todos: [], lates });
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
        <div
          style={{
            display: 'flex',
            alignItems: 'stretch',
            flexWrap: 'wrap',
          }}
        >
          <Card
            style={{
              ...coolBackground,
              padding: '4rem 1rem',
              flex: 3,
              minWidth: 'fit-content',
            }}
          >
            <Text variant="title" bold inverted>
              {this.props.searchPhrase || this.getGreeting()}
            </Text>
          </Card>
          <Card
            ghost
            noGutters
            style={{
              flex: 1,
              minWidth: 'fit-content',
              display: 'flex',
            }}
          >
            <NewTodoContainer />
          </Card>
          <Card
            ghost
            noGutters
            style={{
              flex: 1,
              minWidth: 'fit-content',
              display: 'flex',
            }}
          >
            <SearchTodoContainer />
          </Card>
          <Card
            ghost
            noGutters
            style={{
              flex: 1,
              minWidth: 'fit-content',
              display: 'flex',
            }}
          >
            <Button variant="outlined" fillHorizontal>
              <Text>Feitas 🎉</Text>
            </Button>
          </Card>
        </div>
        <Card ghost noGutters>
          <CardHeader>
            <Text variant="subtitle" cursive>
              Meus Afazeres
            </Text>
          </CardHeader>
          <CardBody>
            <Query
              query={gql`
                {
                  todos {
                    ID
                    title
                    description
                    expireIn
                    late
                    done
                    tags {
                      title
                    }
                  }
                }
              `}
            >
              {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;

                const inTime = data.todos.filter(t => !t.late);
                const lates = data.todos.filter(t => t.late);

                return (
                  <>
                    <LatedTodos lates={lates} />
                    <InTimeTodos todos={inTime} />
                  </>
                );
              }}
            </Query>
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
