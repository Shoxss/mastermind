import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GameStartModal from './GameStartModal';

describe('<GameStartModal />', () => {
  test('it should mount', () => {
    render(<GameStartModal />);
    
    const gameStartModal = screen.getByTestId('GameStartModal');

    expect(gameStartModal).toBeInTheDocument();
  });
});