import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import moment from 'moment';

import { TodoCard } from '../Components';

import 'gestalt/dist/gestalt.css';

const mock_done = {
  _key: 1,
  done: true,
  titulo: 'Titulo do TODO feito',
  descricao: 'Descrição do TODO',
  created_at: moment(),
  updated_at: moment(),
  until_at: moment().add(7, 'days'),
};

const mock_not_done = {
  _key: 1,
  done: false,
  titulo: 'Titulo do TODO não feito',
  descricao: 'Descrição do TODO',
  created_at: moment(),
  updated_at: moment(),
  until_at: moment().add(7, 'days'),
};

storiesOf('TodoCard', module)
  .add('Done', () => <TodoCard todo={mock_done} />)
  .add('not Done', () => <TodoCard todo={mock_not_done} />);
