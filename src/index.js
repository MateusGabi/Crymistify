import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import moment from 'moment';
import Log from './Services/Log'
import 'material-design-lite';

import 'moment/locale/pt-br';
moment.locale('pt-br');

Log.init("fwvXm60JcJ6amhxtBDUs5XibZv3zxZ");

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
