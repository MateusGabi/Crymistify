/** @format */
import React from 'react';
import styled, { css } from 'styled-components';

import Board from './Board';
import Footer from './Footer';
import Loading from './Loading';
import Logging from './Logging';
import Sidebar from './Sidebar';
import Snackbar from './Snackbar';
import TodoCard from './TodoCard';

export const coolBackground = {
  background: 'rgb(102, 125, 182)',
  background: `linear-gradient(to right, #2980B9, #65b4d0)`,
};

export const primaryBackground = {
  background: 'rgb(252, 70, 107)',
  background: `linear-gradient(to right, rgb(252, 70, 107), rgb(63, 94, 251))`,
};

export const successBackground = {
  background: 'rgb(67, 198, 172)',
  background: `linear-gradient(to right, rgb(67, 198, 172), rgb(248, 255, 174))`,
};

export const mangoesBackground = {
  background: 'rgb(247, 255, 0)',
  background: `linear-gradient(to right, rgb(247, 255, 0), rgb(219, 54, 164))`,
};

export const Badge = styled.div`
  background-color: ${props =>
    props.color || 'red'};
  padding: .5rem 1rem;
  margin-right: .25rem;
  width: fit-content;
  border-radius: 1rem;
`

export const Button = styled.button`
    background: rgb(252, 70, 107);
    background: linear-gradient(to right, rgb(252, 70, 107), rgb(63, 94, 251));
    border: 0;
    padding: .5rem 2rem;
    border-radius: 1rem;
    min-height: 2.5rem;
    cursor: pointer;

    ${props =>
      props.variant === 'text' &&
      css`
        background: transparent;
      `}

    ${props =>
      props.variant === 'outlined' &&
      css`
        background: inherit;
        border: 1px solid;
        border-image-source: linear-gradient(
          to right,
          rgb(252, 70, 107),
          rgb(63, 94, 251)
        );
        border-image-slice: 1;
        background: linear-gradient(
          to right,
          rgb(252, 70, 107),
          rgb(63, 94, 251)
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: rgb(166, 81, 179);
        color: rgb(252, 70, 107);
      `}

    ${props =>
      props.fillHorizontal &&
      css`
        width: -webkit-fill-available;
      `}
`;

export const Text = styled.p`
    font-family: ${props => props.theme.fontFamily}, Arial, sans-serif;
    font-size: 1rem;
    margin: 0.2rem 0;
    font-style: ${props => (props.italic ? 'italic' : 'initial')};
    font-weight: ${props => (props.bold ? 'bold' : 'initial')};
    letter-spacing: .025rem;
    color: #733a3a;

    ${props =>
      props.variant === 'title' &&
      css`
        font-size: 2rem;
      `}

    ${props =>
      props.variant === 'subtitle' &&
      css`
        font-size: 1.5rem;
      `}

    ${props =>
      props.variant === 'small' &&
      css`
        font-size: 0.75rem;
      `}

    ${props =>
      props.inverted &&
      css`
        color: #fff;
      `}

    ${props =>
      props.cursive &&
      css`
        font-family: 'Leckerli One', cursive;
      `}
`;

export const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

export const Label = styled(Text)``;

export const Input = styled.input`
  font-family: ${props => props.theme.fontFamily}, Arial, sans-serif;
  padding: 0.5rem 1rem;
  margin: 0;
  border-radius: 1rem;
  min-height: 2.5rem;
  border: 1px solid #ccc;
  color: #905c5c;

  ${props =>
    props.fillHorizontal &&
    css`
      width: -webkit-fill-available;
    `}
`;

export const Box = styled.div`
    ${props =>
      props.container &&
      css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0;
        padding: 1rem;
      `}

    ${props =>
      props.horizontalScroll &&
      css`
        overflow-x: scroll;
      `}
    
    ${props =>
      props.fixed &&
      css`
        position: fixed;
        z-index: 5;
      `}

    ${props =>
      props.fillHorizontal &&
      css`
        width: -webkit-fill-available;
      `}

    ${props =>
      props.item &&
      css`
        margin: 1rem;
      `}

    ${props =>
      props.noGutters &&
      css`
        margin: 0rem;
      `}
`;

export const TimeToDone = styled.div`
  display: flex;
  align-items: center;
`;

export const Card = styled.div`
    background: #f5f5f542;
    border-radius: 1rem;
    margin: 1rem;
    transition: 0.5s;

    ${props =>
      !props.noGutters &&
      css`
        padding: 1rem;
      `}

    ${props =>
      !props.ghost &&
      css`
        box-shadow: 0.5rem 0.5rem 1rem 0 #e1e1e1;
      `}

    ${props =>
      props.noVerticalMargin &&
      css`
        margin: 1rem 0;
      `}
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
`;

export const CardBody = styled.div``;

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  background: #fff;
  overflow: overlay;
  display: flex;
`;

export const ModalHeader = styled.div``;

export const ModalBody = styled.div`
  flex: 1;
  background: #fff;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  padding: 1rem;
  max-width: 40rem;
  margin: 70px auto 0 auto;
`;

export const ArrowBack = () => (
  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAAXNSR0IArs4c6QAAAQlJREFUeJzt2uFNg0AYBuBXJ2CEbqAjOIIjuJKT2BF0guIGjtBOgD9KU9McLQmnSHie5ELC3Y8vb74AByQAAAAAAAAAAEBJk2SXpOuPzbzlLMvP8E5jO2tFC1IKr0vyPmdRSzEUXpfkeca6FuFaeC8z1rUIwptAeBMIbwLhTSC8CYQ30l3h3CbJW5LHwtw+SfurFf1fbZLXJF+3Fg51nlHYqpY6sLuW7sodcvHC5L6w6ONvalmkUR246Rc+FOYOWe81cNuPm9fA5NimbdyFJxFiBUKsQIgVCLECIVYgxAqEWMFQiKv7Klfayo2xT/KU5PPi/KindM6aHLvu1H3+TAAAAAAAAAAAzr4BFwPQSsI8Zl0AAAAASUVORK5CYII=" />
);

export { Board, Footer, Loading, Logging, Sidebar, Snackbar, TodoCard };
