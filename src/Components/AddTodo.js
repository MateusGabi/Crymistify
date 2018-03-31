import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Heading } from 'gestalt';

class AddTodo extends Component {
  constructor(props) {
    super(props);

    this.fecharModal = this.fecharModal.bind(this);
  }

  fecharModal(event) {
    event.preventDefault();

    document.getElementById(this.props.id).className =
      'ModalWrapper modal-close';
  }

  render() {
    return (
      <div id={this.props.id}>
        <div>
          <div>
            <Heading size="sm" accessibilityLevel={4}>
              {this.props.titulo}
            </Heading>
          </div>

          <div>{this.props.corpo}</div>

          <div>{this.props.rodape}</div>
        </div>
      </div>
    );
  }
}

AddTodo.propTypes = {
  id: PropTypes.string,
  titulo: PropTypes.string,
  corpo: PropTypes.element,
  rodape: PropTypes.element,
};

export default AddTodo;
