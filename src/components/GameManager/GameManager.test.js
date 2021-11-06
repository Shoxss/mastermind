import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GameManager from './GameManager';

describe('<GameManager />', () => {
  test('it should mount', () => {
    render(<GameManager />);
    
    const gameManager = screen.getByTestId('GameManager');

    expect(gameManager).toBeInTheDocument();
  });
});