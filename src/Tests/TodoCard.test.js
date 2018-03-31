/** @format */
import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

import { TodoCard } from './../Components';

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

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TodoCard todo={mock_done} />, div);
    ReactDOM.render(<TodoCard todo={mock_not_done} />, div);
});
