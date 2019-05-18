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
    background: linear-gradient(45deg, #2196F3 30%, #21CBF3 80%);
    border: 0;
    padding: .5rem 2rem;
    border-radius: 1rem;
`;

const Text = styled.p`
    font-family: ${props => props.theme.fontFamily}, Arial, sans-serif;
    font-size: 1rem;
    margin: 0.2rem 0;
    font-style: ${props => (props.italic ? 'italic' : 'initial')};
    font-weight: ${props => (props.bold ? 'bold' : 'initial')};
    letter-spacing: .025rem;
    color: #733a3a;

    ${props => props.variant === 'title' && css`
        font-size: 2rem;
    `}

    ${props => props.variant === 'subtitle' && css`
        font-size: 1.5rem;
    `}

    ${props => props.inverted && css`
        color: #fff;
    `}

    ${props => props.cursive && css`
        font-family: 'Leckerli One', cursive;
    `}
`;

const Input = styled.input``

const Box = styled.div`
    ${props => props.container && css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0;
        padding: 1rem;
    `}

    ${props => props.fixed && css`
        position: fixed;
        z-index: 5;
    `}

    ${props => props.fillHorizontal && css`
        width: -webkit-fill-available;
    `}
`;

const TimeToDone = styled.div`
    display: flex;
    align-items: center;
`;

const Card = styled.div`
    background: #f5f5f542;
    border-radius: 1rem;
    margin: 1rem;

    ${props => !props.noGutters && css`
        padding: 1rem;
    `}

    ${props => !props.ghost && css`
        box-shadow: .5rem .5rem 1rem 0 #e1e1e1;
    `}

    ${props => props.noVerticalMargin && css`
        margin: 1rem 0;
    `}
`;

const CardHeader = styled.div`
    display: flex;
    align-items: center;
`;

const CardBody = styled.div``;

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
    CardBody,
    CardFooter,
    Input
};
