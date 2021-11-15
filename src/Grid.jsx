import React, { useState } from 'react';
import Cell from './Cell';
import './Grid.css';

const Row = (props) => {
  return (
    <div className='row' key={props.index}>
      {props.cells.map((cell) => (
        <Cell alive={cell} />
      ))}
    </div>
  );
};

const Grid = () => {
  const generateGrid = () => {
    const grid = [];
    for (let i = 0; i < 10; i++) {
      let row = Array.from({ length: 10 }, () => Math.floor(Math.random() * 2));
      grid.push(row);
    }
    return grid;
  };
  const [grid, setGrid] = useState(generateGrid());

  const tryToAdd = (inputArr, outputArr, x, y) => {
    const row = inputArr[x];
    if (row !== undefined) {
      const cell = inputArr[x][y];
      if (cell !== undefined) {
        outputArr.push(cell);
      }
    }
  };

  const sum = (a, b) => a + b;

  const livesOrDies = (grid, cell, rowIdx, cellIdx) => {
    const surroundings = [];
    const possibleNeighbors = [
      { x: rowIdx - 1, y: cellIdx - 1 },
      { x: rowIdx - 1, y: cellIdx },
      { x: rowIdx - 1, y: cellIdx + 1 },
      { x: rowIdx, y: cellIdx - 1 },
      { x: rowIdx, y: cellIdx + 1 },
      { x: rowIdx + 1, y: cellIdx - 1 },
      { x: rowIdx + 1, y: cellIdx },
      { x: rowIdx + 1, y: cellIdx + 1 },
    ];
    possibleNeighbors.forEach((n) => {
      tryToAdd(grid, surroundings, n.x, n.y);
    });
    const numberOfNeighbors = surroundings.reduce(sum);

    const reproduction = cell === 0 && numberOfNeighbors === 3;
    const maintains =
      cell === 1 && (numberOfNeighbors === 3 || numberOfNeighbors === 2);

    if (reproduction || maintains) {
      return 1;
    } else return 0;
  };

  const nextState = () => {
    const newState = grid.map((row, rowIdx) => {
      return row.map((cell, cellIdx) => {
        return livesOrDies(grid, cell, rowIdx, cellIdx);
      });
    });
    setGrid(newState);
  };

  return (
    <div>
      <div>
        {grid.map((row) => (
          <Row cells={row} />
        ))}
      </div>
      <button onClick={nextState}>Next</button>
    </div>
  );
};

export default Grid;
