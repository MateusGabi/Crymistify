import React, { Component } from 'react'
import TodoCard from './../TodoCard/TodoCard'
import moment from 'moment'
import Service from './../API/API'

window['dialogPolyfill'] = {
    registerDialog: () => {}
};

export default class Board extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userName: ''
        };

        this.showAddTODO = this.showAddTODO.bind(this);
        this.fecharAddTODO = this.fecharAddTODO.bind(this);
        this.adicionarTODO = this.adicionarTODO.bind(this);

        this.handleChangeTitulo = this.handleChangeTitulo.bind(this);
        this.handleChangeDescricao = this.handleChangeDescricao.bind(this);
    }

    componentDidMount() {
        Service.getUser().subscribe(
            user => this.setState({userName: user.displayName})
        );
    }

    handleChangeTitulo(event) {
        this.setState({novoTODO__titulo: event.target.value});
    }

    handleChangeDescricao(event) {
        this.setState({novoTODO__descricao: event.target.value});
    }

    showAddTODO() {
        this.getRgisteredDialog().then(d => d.showModal());
    }

    fecharAddTODO() {
        this.getRgisteredDialog().then(d => d.close());
        this.setState({novoTODO__titulo: "", novoTODO__descricao: ""});
    }

    adicionarTODO() {
        let TODO = {
            titulo: this.state.novoTODO__titulo,
            descricao: this.state.novoTODO__descricao,
            data: moment().format('l')
        };

        Service.addTodo(TODO).then(res => {
            if(res) {
                alert('Todo inserido!');
                this.fecharAddTODO();
            }
            else alert('um erro ocorreu');

        });
    }

    getRgisteredDialog() : Promise<any> {
        let _dialog =  document.getElementById('dialog');

        window['dialogPolyfill'].registerDialog(_dialog);

        return Promise.resolve(_dialog);

    }

    render() {
        return (
            <div className="board">
            <div className="mdl-grid mdl-typography--text-center">
                <div className="mdl-cell mdl-cell--12-col">
                    <h3>Olá, <strong>{this.state.userName}</strong>! <span role="img" aria-label="">✌</span></h3>
                </div>
            </div>
            <ul className="mdl-list">
            {
                this.props.todos.map(
                    (todo, i) => (<TodoCard todo={todo} />)
                )
            }
            </ul>
            <button onClick={this.showAddTODO} class="fab mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
            <i class="material-icons">add</i>
            </button>
            <dialog id="dialog" class="mdl-dialog">
            <h4 class="mdl-dialog__title">Novo Item</h4>
            <div class="mdl-dialog__content">
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="text" id="sample3" value={this.state.novoTODO__titulo} onChange={this.handleChangeTitulo} />
            <label class="mdl-textfield__label" for="sample3">Titulo...</label>
            </div>
            <div class="mdl-textfield mdl-js-textfield">
            <textarea class="mdl-textfield__input" type="text" rows= "3" id="sample5" value={this.state.novoTODO__descricao} onChange={this.handleChangeDescricao} ></textarea>
            <label class="mdl-textfield__label" for="sample5">Descrição...</label>
            </div>
            </div>
            <div class="mdl-dialog__actions">
            <button onClick={this.fecharAddTODO} type="button" class="mdl-button">Fechar</button>
            <button onClick={this.adicionarTODO} type="button" class="mdl-button">Adidiconar</button>
            </div>
            </dialog>
            </div>
        );
    }
}
