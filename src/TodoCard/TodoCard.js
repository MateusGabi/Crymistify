import React, { Component } from 'react'
import Service from './../API/API'
import Log from './../Services/Log'
import SnackbarService from './../Services/Snackbar'
import moment from 'moment'

export default class TodoCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            todo: this.props.todo,
            created_at: 'calculando...',
            to_date: 'calculando...',
            backgroundColor: '#d0ccd0'
        };

        this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
        this.handleEditTitle = this.handleEditTitle.bind(this)
        this.handleEditDescription = this.handleEditDescription.bind(this)
        this.handleClickEditData = this.handleClickEditData.bind(this)
        this.showSnackbar = this.showSnackbar.bind(this)
    }

    componentDidMount() {
        this.timer = setInterval(
            () => {
                this.coolFormatDate();
                this.setBackgroundColor();
                this.resize();
            },
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    handleMarkAsDone() {
        let _confirm = window.confirm(`Marcar ${this.state.todo.titulo} como feito ?`);
        if (_confirm) {
            Service.remover(this.state.todo)
            SnackbarService.showMessage(`Item '${this.state.todo.titulo}' removido!'`)

            Log.log('user marked a todo as done', { todo_key: this.state.todo._key })
        } else {
            Log.log('user give up to mark a todo as done', { todo_key: this.state.todo._key })
        }
    }

    handleEditTitle(event) {
        this.setState({
            todo:
                { titulo: event.target.value }
        })
        Log.log('user set todo title', { todo_key: this.state.todo._key })

        // possível grande demeon aqui!!
        // essa coisa de que a cada type salva no banco não é bom!
        Service.editTodo(this.state.todo)
    }

    handleEditDescription(event) {
        this.setState({
            todo:
                { descricao: event.target.value }
        })

        Log.log('user set todo description', { todo_key: this.state.todo._key })

        Service.editTodo(this.state.todo)
    }

    handleClickEditData(event) {
        SnackbarService.showMessage(`Uhh... Nos desculpe, mas essa função não disponível.`)
    }

    showSnackbar(event) {
        SnackbarService.showMessage(`Item '${this.state.todo.titulo}' editado!`)
    }

    coolFormatDate(): string {
        let diff = moment(this.state.todo.created_at).fromNow();
        let diff1 = moment(this.state.todo.until_at).calendar();
        return this.setState({ created_at: diff, to_date: diff1 });
    }

    setBackgroundColor() {

        let oneday = 1000 * 60 * 60 * 24;
        let now = moment().valueOf();
        let day_to_end = moment(this.state.todo.until_at).valueOf();

        let rest = Math.round((day_to_end - now) / oneday).valueOf();

        let color = "#d0ccd0";

        if (rest <= 1) {
            color = "red";

            if (this.state.todo.until_at === undefined) {
                this.setState({ to_date: undefined })
                color = "#737373";
            }
        }
        else if (rest > 1 && rest <= 3) {
            color = "#ff9800";
        }
        else if (rest > 3 && rest <= 5) {
            color = "#ffc800";
        }
        else if (rest > 5 && rest <= 7) {
            color = "#69f0ae";
        }

        this.setState({ backgroundColor: color });
    }

    resize() {
        let textarea = document.querySelector('#' + this.state.todo._key + ' textarea')

        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    }

    render() {

        const restTimeStyle = {
            backgroundColor: this.state.backgroundColor,
            padding: '5px',
            borderRadius: '3px',
            color: '#fff',
            textShadow: '0px 0px 0px black',
            cursor: 'pointer'
        };

        let timeToDoneDIV =
            (
                <p className='grid-cell'><small>
                    <span onClick={this.handleClickEditData} style={restTimeStyle}>
                        <span role='img' aria-label='clock'>🕐</span> {this.state.to_date || 'Adicinar data de entrega'}
                    </span>
                </small>
                </p>
            );

        let descriptionDIV =
            (
                <textarea className='input p grid-cell' onBlur={this.showSnackbar} placeholder='Adicionar descrição' onChange={this.handleEditDescription} defaultValue={this.state.todo.descricao} />
            );

        return (
            <li className="card">
                <div id={this.state.todo._key} className="form">
                    <div className="grid-wrapper">
                        <input className='input h5 grid-cell' onBlur={this.showSnackbar} onChange={this.handleEditTitle} value={this.state.todo.titulo} />
                    </div>
                    <div className="grid-wrapper">
                        {descriptionDIV}
                    </div>
                    <div className="grid-wrapper">
                        {timeToDoneDIV}
                    </div>
                    <div className="grid-wrapper">
                        <div className='grid-cell'>
                            <a onClick={this.handleMarkAsDone} className="button button-primary">
                                <i className="icon">
                                    <i data-feather="check"></i>
                                </i>

                                <span>Feito</span>

                            </a>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
}
