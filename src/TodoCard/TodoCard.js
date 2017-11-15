import React, { Component } from 'react'
import Service from './../API/API'
import moment from 'moment'

export default class TodoCard extends Component {

    constructor(props) {
        super(props);

        this.handleMarkAsDone = this.handleMarkAsDone.bind(this);
    }

    handleMarkAsDone() {
        let _confirm = window.confirm(`Remover ${this.props.todo.titulo} ?`);
        if(_confirm) {
            Service.remover(this.props.todo);
        }
    }

    coolFormatDate() : string {
        return moment(this.props.todo.created_at).fromNow();
    }

    render(){
        return (
            <li className="mdl-list__item">
                <div className="mdl-card">
                    <div className="mdl-card__title">
                        <h6>{this.props.todo.titulo}</h6>
                    </div>
                    <div className="mdl-card__supporting-text">
                        <p>{this.props.todo.descricao}</p>
                        <p><em>criado {this.coolFormatDate()}</em></p>
                    </div>
                    <div className="mdl-card__actions mdl-card--border">
                        <button onClick={this.handleMarkAsDone} class="mdl-button mdl-js-button mdl-button--accent">
                            Mark as done
                        </button>
                    </div>
                </div>
            </li>
        );
    }
}
