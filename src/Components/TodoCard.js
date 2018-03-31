import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Service from './../Services/API';
import Log from './../Services/Log';
import SnackbarService from './../Services/Snackbar';

import { Icon, Text, Box, Avatar, Button, Mask } from 'gestalt';

const timeToDone = time => {
  if (time) {
    return (
      <Box alignItems="center" display="flex">
        <Box marginRight={1} padding={1}>
          <Icon icon="clock" color="darkGray" />
        </Box>
        <Text align="center" color="darkGray">
          {time}
        </Text>
      </Box>
    );
  } else {
    return [];
  }
};

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
    this.handleEditTitle = this.handleEditTitle.bind(this);
    this.handleEditDescription = this.handleEditDescription.bind(this);
    this.handleClickEditData = this.handleClickEditData.bind(this);
    this.showSnackbar = this.showSnackbar.bind(this);
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.coolFormatDate();
      this.setBackgroundColor();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handleMarkAsDone() {
    let _confirm = window.confirm(
      `Marcar ${this.state.todo.titulo} como feito ?`
    );
    if (_confirm) {
      Service.remover(this.state.todo);
      SnackbarService.showMessage(
        `Item '${this.state.todo.titulo}' removido!'`
      );

      Log.log('user marked a todo as done', { todo_key: this.state.todo._key });
    } else {
      Log.log('user give up to mark a todo as done', {
        todo_key: this.state.todo._key,
      });
    }
  }

  handleEditTitle(event) {
    this.setState({
      todo: { titulo: event.target.value },
    });
    Log.log('user set todo title', { todo_key: this.state.todo._key });

    // possível grande demeon aqui!!
    // essa coisa de que a cada type salva no banco não é bom!
    Service.editTodo(this.state.todo);
  }

  handleEditDescription(event) {
    this.setState({
      todo: { descricao: event.target.value },
    });

    Log.log('user set todo description', { todo_key: this.state.todo._key });

    Service.editTodo(this.state.todo);
  }

  handleClickEditData() {
    SnackbarService.showMessage(
      `Uhh... Nos desculpe, mas essa função não disponível.`
    );
  }

  showSnackbar() {
    SnackbarService.showMessage(`Item '${this.state.todo.titulo}' editado!`);
  }

  coolFormatDate() {
    let diff = moment(this.state.todo.created_at).fromNow();
    let diff1 = moment(this.state.todo.until_at).fromNow();
    return this.setState({ created_at: diff, to_date: diff1 });
  }

  setBackgroundColor() {
    let oneday = 1000 * 60 * 60 * 24;
    let now = moment().valueOf();
    let day_to_end = moment(this.state.todo.until_at).valueOf();

    let rest = Math.round((day_to_end - now) / oneday).valueOf();

    let color = '#fff';

    if (rest <= 0) {
      color = '#000';

      if (this.state.todo.until_at === undefined) {
        this.setState({ to_date: undefined });
        color = '#fff';
      }
    } else if (rest > 0 && rest <= 3) {
      color = '#dd2c00';
    } else if (rest > 3 && rest <= 5) {
      color = '#ff6d00';
    } else if (rest > 5 && rest <= 7) {
      color = '#ffd600';
    }

    if (this.state.todo.done) {
      color = 'transparent';
    }

    this.setState({ backgroundColor: color });
  }

  render() {
    let _timeToDone = timeToDone(this.state.to_date);

    let done_text = this.state.todo.done
      ? 'Marcar como não Feito'
      : 'Marcar como Feito';

    let style = this.state.todo.done ? { textDecoration: 'line-through' } : {};

    return (
      <Box alignItems="center" direction="row" display="flex" paddingY={5}>
        <Box paddingX={1}>
          <Mask height={10} shape="circle" width={10}>
            <div
              style={{
                backgroundColor: this.state.backgroundColor,
                width: 10,
                height: 10,
              }}
            />
          </Mask>
        </Box>
        <Box paddingX={1}>
          <Avatar name={this.props.todo.titulo} size="md" />
        </Box>
        <Box paddingX={1} flex="grow">
          <Box paddingY={1}>
            <Text bold>
              <span style={style}>{this.props.todo.titulo}</span>
            </Text>
          </Box>
          <Box paddingY={1}>
            <Text italic>
              <span style={style}>{this.props.todo.descricao}</span>
            </Text>
          </Box>
          {this.state.todo.done ? (
            ''
          ) : (
            <Box paddingY={1}>
              <Text>{_timeToDone}</Text>
            </Box>
          )}
        </Box>
        <Box paddingX={1}>
          <Button text={done_text} size="md" onClick={this.handleMarkAsDone} />
        </Box>
      </Box>
    );
  }
}

TodoCard.propTypes = {
    todo: PropTypes.object
}

export default TodoCard;
