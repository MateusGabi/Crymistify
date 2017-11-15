import React, { Component } from 'react'
import Service from './../API/API'
import moment from 'moment'

export default class TodoCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            created_at: '',
            to_date: ''
        };

        this.handleMarkAsDone = this.handleMarkAsDone.bind(this);
    }

    componentDidMount() {
        this.timer = setInterval(
            () => {
                this.coolFormatDate();
            },
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    handleMarkAsDone() {
        let _confirm = window.confirm(`Remover ${this.props.todo.titulo} ?`);
        if(_confirm) {
            Service.remover(this.props.todo);
        }
    }

    coolFormatDate() : string {
        let diff = moment(this.props.todo.created_at).fromNow();
        let diff1 = moment(this.props.todo.until_at).fromNow();
        return this.setState({ created_at: diff, to_date: diff1});
    }

    render(){
        return (
            <li className="mdl-list__item">
                <div className="mdl-card">
                    <div className="mdl-card__title">
                        <p>{this.props.todo.titulo}</p>
                    </div>
                    <div className="mdl-card__supporting-text">
                        <p><small>🕐 {this.state.to_date}</small></p>
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
