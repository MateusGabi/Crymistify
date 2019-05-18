/** @format */
import styled, { css } from 'styled-components';


import AddTodo from './AddTodo';
import Board from './Board';
import Footer from './Footer';
import Loading from './Loading';
import Logging from './Logging';
import Sidebar from './Sidebar';
import Snackbar from './Snackbar';
import TodoCard from './TodoCard';

const Button = styled.button`
    background: rgb(57,255,51);
    background: linear-gradient(45deg, #2196F3 30%, #21CBF3 90%);
    border: 0;
    padding: .5rem 2rem;
    border-radius: 1rem;
    color: white;
    text-transform: uppercase;
`;

const Text = styled.p`
    font-family: ${props => props.theme.fontFamily}, Arial, sans-serif;
    font-size: 1rem;
    margin: 0.2rem 0;
    font-style: ${props => (props.italic ? 'italic' : 'initial')};
    font-weight: ${props => (props.bold ? 'bold' : 'initial')};
    letter-spacing: .025rem;

    ${props => props.variant === 'title' && css`
        font-size: 2rem;
    `}

    ${props => props.inverted && css`
        color: #fff;
    `}
`;

const Box = styled.div``;

const TimeToDone = styled.div`
    display: flex;
    align-items: center;
`;

const Card = styled.div`
    background: #f5f5f542;
    border-radius: 1rem;
    box-shadow: .5rem .5rem 1rem 0 #e1e1e1;
    padding: 1rem;
    margin: 1rem;
`;

const CardHeader = styled.div`
    display: flex;
    align-items: center;
`;

const CardFooter = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export {
    AddTodo,
    Board,
    Footer,
    Loading,
    Logging,
    Sidebar,
    Snackbar,
    TodoCard,
    Button,
    Text,
    Box,
    TimeToDone,
    Card,
    CardHeader,
    CardFooter
};
