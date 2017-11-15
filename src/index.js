import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import moment from 'moment';
import 'material-design-lite';

import 'moment/locale/pt-br';
moment.locale('pt-br');

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
