import React, { Component } from 'react'
import Icon from './../Icon/Icon'


import { Heading } from 'gestalt'

class NovoTODO extends Component {

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
            <div id={this.props.id}>
                <div>
                    <div>
                        <Heading size="sm" accessibilityLevel={4}>{this.props.titulo}</Heading>
                    </div>

                    <div>
                        {this.props.corpo}
                    </div>

                    <div>
                        {this.props.rodape}
                    </div>
                </div>
            </div >
        );
    }

}

export default NovoTODO;
