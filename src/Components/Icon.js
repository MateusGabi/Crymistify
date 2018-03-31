import React, { Component } from 'react';
import PropTypes from 'prop-types';
import feather from 'feather-icons';

class Icon extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.getRandomID(),
    };
  }

  getRandomID() {
    let id = Math.random()
      .toString(36)
      .substring(7);

    return `icon-${id}`;
  }

  componentDidMount() {
    let svg = (
      feather.icons[this.props.name] || feather.icons['feather']
    ).toSvg(this.props.style);
    document.getElementById(this.state.id).innerHTML = svg;
  }

  render() {
    return <i id={this.state.id} />;
  }
}


Icon.propTypes = {
    name: PropTypes.string,
    style: PropTypes.object
}

export default Icon;
