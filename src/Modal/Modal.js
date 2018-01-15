import React, { Component } from 'react'
import Icon from './../Icon/Icon'

class Modal extends Component {

    constructor(props) {
        super(props);

        this.fecharModal = this.fecharModal.bind(this)
    }

    fecharModal(event) {
        event.preventDefault()

        document.getElementById(this.props.id).className = "ModalWrapper modal-close"
    }


    render() {
        return (
            <div id={this.props.id} className='ModalWrapper modal-close'>
                <div className='Modal'>
                    <div onClick={this.fecharModal} className='Fechar'>
                        <Icon name='x' />
                    </div>

                    <div className='Titulo'>
                        <h1>{this.props.titulo}</h1>
                    </div>

                    <div className='Corpo'>
                        {this.props.corpo}
                    </div>

                    <div className='Rodape'>
                        {this.props.rodape}
                    </div>
                </div>
            </div >
        );
    }

}

export default Modal;