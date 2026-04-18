/** @format */

import React from 'react';
import PropTypes from 'prop-types';
import { TodoCard, Text } from './index';

class Todos extends React.Component {
  render() {
    if (this.props.todos.length === 0) {
      return null;
    }

    return (
      <>
        <Text bold style={{ marginTop: '2rem' }}>
          Próximos
        </Text>
        {this.props.todos.map(todo => (
          <TodoCard key={todo.ID} todo={todo} />
        ))}
      </>
    );
  }
}

Todos.propTypes = {
  todos: PropTypes.array,
};

export default Todos;
