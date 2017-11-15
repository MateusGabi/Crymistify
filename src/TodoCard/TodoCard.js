import React, { Component } from 'react'
import Service from './../API/API'
import moment from 'moment'

export default class TodoCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            created_at: 'calculando...',
            to_date: 'calculando...',
            backgroundColor: '#d0ccd0'
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

        this.setBackgroundColor();
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    handleMarkAsDone() {
        let _confirm = window.confirm(`Remover ${this.props.todo.titulo} ?`);
        if (_confirm) {
            Service.remover(this.props.todo);
        }
    }

    coolFormatDate(): string {
        let diff = moment(this.props.todo.created_at).fromNow();
        let diff1 = moment(this.props.todo.until_at).fromNow();
        return this.setState({ created_at: diff, to_date: diff1 });
    }

    setBackgroundColor() {

        let oneday = 1000 * 60 * 60 * 24;
        let now = moment().valueOf();
        let day_to_end = moment(this.props.todo.until_at).valueOf();

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

        let timeToDoneDIV = this.props.todo.until_at !== undefined ?
            (
                <p><small>
                    <span style={restTimeStyle}>
                        <span role='img'>🕐</span> {this.state.to_date}
                    </span>
                </small>
                </p>
            ) : (<div></div>);

        let descriptionDIV = this.props.todo.until_at !== undefined ?
            (
                <p>{this.props.todo.descricao}</p>
            ) : (<div></div>);

        return (
            <li className="mdl-list__item">
                <div className="mdl-card">
                    <div className="mdl-card__title">
                        <p><strong>{this.props.todo.titulo}</strong></p>
                    </div>
                    <div className="mdl-card__supporting-text">
                        {descriptionDIV}
                        {timeToDoneDIV}
                    </div>
                    <div className="mdl-card__actions mdl-card--border">
                        <button onClick={this.handleMarkAsDone} class="mdl-button mdl-js-button mdl-button--colored">
                            <i class="material-icons">check</i>
                        </button>
                    </div>
                </div>
            </li>
        );
    }
}
