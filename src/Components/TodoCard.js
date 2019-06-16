/** @format */

import React, { Component } from 'react';

import { Avatar } from 'gestalt';
import Icon from './../Components/Icon';
import Log from './../Services/Log';
import PropTypes from 'prop-types';
import Service from './../Services/API';
import SnackbarService from './../Services/Snackbar';
import moment from 'moment';

import {
  TimeToDone,
  Text,
  Card,
  CardHeader,
  Box,
  Button,
  CardFooter,
} from './index';

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
  }

  async handleMarkAsDone() {
    let _confirm = window.confirm(
      `Marcar ${this.state.todo.title} como feito ?`
    );
    if (_confirm) {
      const response = await Service.finish(this.state.todo);

      Log.log('user marked a todo as done', {
        todo_key: this.state.todo.ID,
      });

      alert(`${this.state.todo.title} feito!`);
    } else {
      Log.log('user give up to mark a todo as done', {
        todo_key: this.state.todo.ID,
      });
    }
  }

  render() {
    return (
      <Card noVerticalMargin>
        <CardHeader>
          <Text bold>{this.props.todo.title}</Text>
        </CardHeader>
        <Box>
          {this.props.todo.tags.length > 0 && <Box paddingY={1}>
            <Text italic variant="small">Tags: {
              this.props.todo.tags.map(t => t.title).join(', ')
            }</Text>
          </Box>}
          <Box paddingY={1}>
            <Text>{this.props.todo.description}</Text>
          </Box>
        </Box>
        <CardFooter>
          <TimeToDone>
            <Text italic>{moment(this.state.todo.expireIn).fromNow()}</Text>
          </TimeToDone>
          <Button onClick={this.handleMarkAsDone}>
            <Text inverted>Já fiz 🤘</Text>
          </Button>
        </CardFooter>
      </Card>
    );
  }
}

TodoCard.propTypes = {
  todo: PropTypes.object,
};

export default TodoCard;
