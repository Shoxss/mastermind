import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BrainLogo from './BrainLogo';

describe('<BrainLogo />', () => {
  test('it should mount', () => {
    render(<BrainLogo />);
    
    const brainLogo = screen.getByTestId('BrainLogo');

    expect(brainLogo).toBeInTheDocument();
  });
});