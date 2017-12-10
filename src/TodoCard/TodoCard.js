import React, { Component } from 'react'
import Service from './../API/API'
import Log from './../Services/Log'
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
    }

    componentDidMount() {
        this.timer = setInterval(
            () => {
                this.coolFormatDate();
                this.setBackgroundColor();
            },
            1000
        );

        this.setBackgroundColor();
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    handleMarkAsDone() {
        let _confirm = window.confirm(`Marcar ${this.state.todo.titulo} como feito ?`);
        if (_confirm) {
            Service.remover(this.state.todo);
            Log.log('user marked a todo as done', { todo_key: this.state.todo._key })
        } else {
            Log.log('user give up to mark a todo as done', { todo_key: this.state.todo._key })
        }
    }

    handleEditTitle(event) {
        this.state.todo.titulo = event.target.value
        Log.log('user set todo title', { todo_key: this.state.todo._key })

        // possível grande demeon aqui!!
        // essa coisa de que a cada type salva no banco não é bom!
        Service.editTodo(this.state.todo)
    }

    handleEditDescription(event) {

        this.state.todo.descricao = event.target.value
        Log.log('user set todo description', { todo_key: this.state.todo._key })

        Service.editTodo(this.state.todo)
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

    render() {

        const restTimeStyle = {
            backgroundColor: this.state.backgroundColor,
            padding: '5px',
            borderRadius: '3px',
            color: '#fff',
            textShadow: '0px 0px 0px black'
        };

        let timeToDoneDIV = this.state.todo.until_at !== undefined ?
            (
                <p><small>
                    <span style={restTimeStyle}>
                        <span role='img'>🕐</span> {this.state.to_date}
                    </span>
                </small>
                </p>
            ) : (<div></div>);

        let descriptionDIV = this.state.todo.descricao !== undefined ?
            (
                <textarea onChange={this.handleEditDescription}>{this.state.todo.descricao}</textarea>
            ) : (<div></div>);

        return (
            <li className="mdl-list__item">
                <div className="mdl-card">
                    <div className="TodoCard__title mdl-card__title">
                        <input onChange={this.handleEditTitle} value={this.state.todo.titulo} />
                    </div>
                    <div className="mdl-card__supporting-text">
                        {descriptionDIV}
                        {timeToDoneDIV}
                    </div>
                    <div className="mdl-card__actions mdl-card--border">
                        <button onClick={(e) => e} class="mdl-button mdl-js-button mdl-button--colored">
                            <i class="material-icons">edit</i>
                        </button>
                        <button onClick={this.handleMarkAsDone} class="mdl-button mdl-js-button mdl-button--colored">
                            <i class="material-icons">check</i>
                        </button>
                    </div>
                </div>
            </li>
        );
    }
}
