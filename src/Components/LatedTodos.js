/** @format */

import React from 'react';
import PropTypes from 'prop-types';
import { Text, Box, Button } from './index';
import TodoCard from './TodoCard';

const DEFAULT_SHOW = 1;
class Lated extends React.Component {
  state = {
    shown: DEFAULT_SHOW,
    shownAll: false,
  };

  shownAll = () => {
    this.setState({ shown: this.props.lates.length, shownAll: true });
  };

  resume = () => {
    this.setState({ shown: DEFAULT_SHOW, shownAll: false });
  };

  render() {
    const { shown, shownAll } = this.state;

    const hasLated = this.props.lates.length > 0;

    if (!hasLated) {
      return <></>;
    }

    return (
      <>
        <Box container style={{ padding: 0, marginTop: '2rem' }}>
          <Box>
            <Text bold>Atrasados</Text>
          </Box>
          <Box>
            {shownAll && (
              <Button
                onClick={() => this.resume()}
                variant="outlined"
                fillHorizontal
              >
                <Text italic>Ver menos</Text>
              </Button>
            )}
          </Box>
        </Box>

        {this.props.lates
          .reverse()
          .slice(-1 * shown)
          .map(todo => (
            <TodoCard key={todo._key} todo={todo} />
          ))}

        {this.props.lates.length - shown > 0 && (
          <Button
            onClick={() => this.shownAll()}
            variant="outlined"
            fillHorizontal
          >
            <Text italic>
              Ver outras {this.props.lates.length - shown} tarefas atrasadas...
            </Text>
          </Button>
        )}

        {shownAll && (
          <Button
            onClick={() => this.resume()}
            variant="outlined"
            fillHorizontal
          >
            <Text italic>Ver menos</Text>
          </Button>
        )}
      </>
    );
  }
}

Lated.propTypes = {
  lates: PropTypes.array,
};

export default Lated;
