//@ts-check
import React, { Component } from 'react'
import TodoCard from './../TodoCard/TodoCard'
import moment from 'moment'
import Service from './../API/API'
import Log from './../Services/Log'
import SnackbarService from './../Services/Snackbar'
import __ from 'lodash'
import Icon from './../Icon/Icon'
import NovoTODO from './../NovoTODO/NovoTODO'


import { Text, TextField, TextArea, Box, Button, Column, Heading, Tabs } from 'gestalt'

export default class Board extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modal_id: this.getRandomID(),
            userName: '',
            todos: [],
            sortBy: ['until_at'],
            onlyDones: false,
            activeIndex: 0
        };

        this.showAddTODO = this.showAddTODO.bind(this);
        this.fecharAddTODO = this.fecharAddTODO.bind(this);
        this.adicionarTODO = this.adicionarTODO.bind(this);

        this.handleChangeSort = this.handleChangeSort.bind(this);
        this.handleOnlyDones = this.handleOnlyDones.bind(this);

        this.handleClickTab = this._handleClickTab.bind(this);
    }

    componentDidCatch(error, info) {
        Log.error(error, info);
    }

    componentDidMount() {
        Service.getUser().subscribe(
            user => this.setState({ userName: user.displayName })
        );

        let __todos = this.props.todos;

        this.setState({ todos: __todos });
    }

    handleChangeTitulo(value) {
        this.setState({ novoTODO__titulo: value })

        console.log(value);
    }

    handleChangeDescricao(value) {
        this.setState({ novoTODO__descricao: value })
    }

    handleChangeDate(value) {

        let date: Date = new Date(value)

        date = moment(date).add(12, 'hours').format()

        this.setState({ novoTODO__toDate: date })
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

    handleOnlyDones(event) {
        let _r = this.state.onlyDones

        _r = !_r

        this.setState({ onlyDones: _r })

    }

    _handleClickTab({ activeTabIndex, event }) {
        event.preventDefault();

        this.setState({
            activeIndex: activeTabIndex,
            onlyDones: activeTabIndex === 1
        });


        Log.log('switch tab')
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
            return (<span>Bom hacking, <strong>{this.state.userName}</strong>! <span role="img" aria-label="nerd">🤓</span></span>);
        } else if (h >= 7 && h < 12) {
            return (<span>Bom dia, <strong>{this.state.userName}</strong>! <span role="img" aria-label="peace">✌</span></span>);
        } else if (h >= 12 && h < 18) {
            return (<span>Boa tarde, <strong>{this.state.userName}</strong>! <span role="img" aria-label="peace">🤗</span></span>);
        } else if (h >= 18 && h < 23) {
            return (<span>Boa noite, <strong>{this.state.userName}</strong>! <span role="img" aria-label="peace">👋</span></span>);
        }

    }

    render() {

        let message = "";

        if (this.props.todos.length < 1) {
            message = (<div>
                <h4 className='text-center'>Não há TODOS</h4>
            </div>)
        }

        const corpoModal = (
            <div>
                <Box paddingY={2}>
                    <TextField type="text" placeholder='Titulo' value={this.state.novoTODO__titulo} onChange={({ value }) => this.handleChangeTitulo(value)} />
                </Box>
                <Box paddingY={2}>
                    <TextArea type="text" rows="3" placeholder='Descrição...' value={this.state.novoTODO__descricao} onChange={this.handleChangeDescricao} />
                </Box>
                <Box paddingY={2}>
                    <TextField type="date" onChange={({ value }) => this.handleChangeDate(value)} />
                </Box>
            </div >
        )

        const rodapeModal = (
            <Box
              display="flex"
              direction="row"
              marginLeft={-2}
              marginRight={-2}
            >
              <Box display="flex" direction="row" column={6} paddingX={2}>
                <Button onClick={this.adicionarTODO} color="red" text="Adicionar" />
              </Box>
              <Box column={6} paddingX={2}>
                <Button onClick={this.fecharAddTODO} color="white" text="Limpar" />
              </Box>
            </Box>
        )

        return (
            <div>
                <Box
                    padding={12}
                >
                    <Heading size="sm" accessibilityLevel={2}>
                      {this.props.searchPhrase || this.getGreeting()}
                    </Heading>
                </Box>
                <Box
                    paddingX={12}
                    >
                    <Tabs
                    tabs={[
                      {
                        text: "Para Fazer",
                        href: "#"
                      },
                      {
                        text: "Feitas",
                        href: "#"
                      },
                      {
                        text: "Todas",
                        href: "#"
                      }
                    ]}
                    activeTabIndex={this.state.activeIndex}
                    onChange={this.handleClickTab}
                  />
                  </Box>
                <div className="layout horizontal end justified h-100 bg-primary" style={{padding: '5rem', display: 'none'}}>
                    <div>
                        <div>
                            <span className="form" onClick={this.handleChangeSort}>
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

                <Box display="flex" direction="row" paddingY={2}>
                    <Column span={6}>
                        <Box paddingX={12}>
                            {
                                __.sortBy(this.props.todos, this.state.sortBy).filter(t => t.done == this.state.onlyDones).map(
                                    (todo, i) => (<TodoCard key={todo._key} todo={todo} />)
                                )
                            }
                        </Box>
                    </Column>
                    <Column span={6}>
                        <Box paddingX={12}>
                        <NovoTODO
                            id={this.state.modal_id}
                            titulo='Novo Item'
                            corpo={corpoModal}
                            rodape={rodapeModal}
                        />
                        </Box>
                    </Column>
                </Box>
            </div>
        );
    }
}
