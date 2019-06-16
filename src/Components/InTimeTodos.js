/** @format */

import React from 'react';
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
          <TodoCard todo={todo} />
        ))}
      </>
    );
  }
}

export default Todos;
