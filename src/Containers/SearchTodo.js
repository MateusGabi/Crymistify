import React from 'react';
import { Text, Card, CardHeader, coolBackground, Button } from '../Components/index';

class SearchTodoContainer extends React.Component {
    render() {
        return (
            <Button style={coolBackground}>
                <Text inverted>Buscar</Text>
            </Button>
        )
    }
}

export default SearchTodoContainer