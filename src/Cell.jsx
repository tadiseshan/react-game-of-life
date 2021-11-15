import React from 'react';
import './Cell.css';

const Cell = (props) => {
  const cell = <div className={`cell ${props.alive ? 'alive' : ''}`} />;
  return cell;
};

export default Cell;
