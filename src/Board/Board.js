//@ts-check
import React, { Component } from 'react'
import TodoCard from './../TodoCard/TodoCard'
import moment from 'moment'
import Service from './../API/API'
import Log from './../Services/Log'
import SnackbarService from './../Services/Snackbar'
import __ from 'lodash'
import Icon from './../Icon/Icon'
import Modal from './../Modal/Modal'

export default class Board extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modal_id: this.getRandomID(),
            userName: '',
            todos: [],
            sortBy: ['until_at']
        };

        this.showAddTODO = this.showAddTODO.bind(this);
        this.fecharAddTODO = this.fecharAddTODO.bind(this);
        this.adicionarTODO = this.adicionarTODO.bind(this);

        this.handleChangeTitulo = this.handleChangeTitulo.bind(this);
        this.handleChangeDescricao = this.handleChangeDescricao.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);

        this.handleChangeSort = this.handleChangeSort.bind(this);
    }

    componentDidCatch(error, info) {
        Log.error(error, info);
    }

    componentDidMount() {
        Service.getUser().subscribe(
            user => this.setState({ userName: user.displayName })
        );

        let __todos = this.props.todos;
        __todos.sort(this.order__timeToDone);

        this.setState({ todos: __todos });
    }

    handleChangeTitulo(event) {
        this.setState({ novoTODO__titulo: event.target.value });
    }

    handleChangeDescricao(event) {
        this.setState({ novoTODO__descricao: event.target.value });
    }

    handleChangeDate(event) {

        let date: Date = new Date(event.target.value);

        date = moment(date).add(12, 'hours').format();

        this.setState({ novoTODO__toDate: date });
    }

    handleChangeSort(event) {
        let value = event.target.value

        switch (value) {
            case 'date':
                this.setState({ sortBy: ['until_at'] })
                break;
            case 'insert':
                this.setState({ sortBy: ['created_at'] })
                break;
            case 'alfa':
                this.setState({ sortBy: ['titulo'] })
                break;
            default:
                this.setState({ sortBy: ['until_at'] })
                break;
        }

        Log.log('switch sorter', { sortBy: this.state.sortBy[0] });
    }


    getRandomID(prefix: string) {

        prefix = prefix || 'modal'

        let id = Math.random().toString(36);

        return `${prefix}-${id}`;
    }

    showAddTODO() {


        document.getElementById(this.state.modal_id).className = "ModalWrapper modal-open"

        Log.log(`clicked on fab 'add todo'`);
    }

    fecharAddTODO() {
        this.setState({ novoTODO__titulo: "", novoTODO__descricao: "" });
    }

    adicionarTODO() {
        let TODO = {
            titulo: this.state.novoTODO__titulo,
            descricao: this.state.novoTODO__descricao,
            until_at: this.state.novoTODO__toDate,
            created_at: moment().format()
        };

        Service.addTodo(TODO).then(res => {
            if (res) {
                SnackbarService.showMessage(`Item adicionado 😉`)
                this.fecharAddTODO()
            }
            else SnackbarService.showMessage(`Um erro ocorreu 😔`)

        });
    }

    getGreeting() {

        let now = new Date();
        let h = now.getHours();

        // 23..7 good hacking
        // 7..12 good morning
        // 12..18 good afternoon
        // 18..23 good evening
        if (h >= 23 || (h >= 0 && h < 7)) {
            return (<h4>Good hacking, <strong>{this.state.userName}</strong>! <span role="img" aria-label="nerd">🤓</span></h4>);
        } else if (h >= 7 && h < 12) {
            return (<h4>Good morning, <strong>{this.state.userName}</strong>! <span role="img" aria-label="peace">✌</span></h4>);
        } else if (h >= 12 && h < 18) {
            return (<h4>Good afternoon, <strong>{this.state.userName}</strong>! <span role="img" aria-label="peace">🤗</span></h4>);
        } else if (h >= 18 && h < 23) {
            return (<h4>Good evening, <strong>{this.state.userName}</strong>! <span role="img" aria-label="peace">👋</span></h4>);
        }

    }

    render() {

        let message = "";

        if (this.props.todos.length < 1) {
            message = (<div>
                <h4 className='mdl-typography--text-center'>Não há TODOS</h4>
            </div>)
        }

        const style =
            {
                width: '100%',
                marginBottom: '1rem'
            }

        const corpoModal = (
            <div className="layout vertical form">
                <div className="">
                    <input className="input h5" style={style} type="text" placeholder='Titulo' value={this.state.novoTODO__titulo} onChange={this.handleChangeTitulo} />
                </div>
                <div className="">
                    <textarea className="input h6" style={style} type="text" rows="3" placeholder='Descrição...' value={this.state.novoTODO__descricao} onChange={this.handleChangeDescricao} ></textarea>
                </div>
                <div className="">
                    <input className="input h6" style={style} type="date" onChange={this.handleChangeDate} />
                </div>
            </div >
        )

        const rodapeModal = (
            <div className="layout horizontal center">
                <button onClick={this.adicionarTODO} type="button" style={{ marginRight: '1rem' }} className="button button-primary">Adidiconar</button>
                <button onClick={this.fecharAddTODO} type="button" className="button">Fechar</button>
            </div>
        )

        return (
            <div className="container" >
                <div className="layout horizontal center justified h-200">
                    <div className="mdl-cell mdl-cell--8-col">
                        {this.getGreeting()}
                    </div>

                    <div className="Board-top-sort mdl-cell mdl-cell--4-col">
                        <div>
                            <p>Ordenar por: </p>
                        </div>
                        <div><span className="form">
                            <select className='select' onChange={this.handleChangeSort}>
                                <option value="date">Data Entrega</option>
                                <option value="insert">Data Criação</option>
                                <option value="alfa">Alfabética (Título)</option>
                            </select>
                        </span>
                        </div>
                    </div>
                </div>

                {message}

                <ul className="layout horizontal wrap" >
                    {
                        __.sortBy(this.props.todos, this.state.sortBy).map(
                            (todo, i) => (<TodoCard key={todo._key} todo={todo} />)
                        )
                    }
                </ul>
                <div onClick={this.showAddTODO} className='button button-primary fab'><Icon name='plus' /></div>
                <Modal
                    id={this.state.modal_id}
                    titulo='Novo Item'
                    corpo={corpoModal}
                    rodape={rodapeModal}
                />
            </div>
        );
    }
}
