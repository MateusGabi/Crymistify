import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { AddTodo } from '../Components';

storiesOf('AddTodo', module).add('default', () => <AddTodo />);
