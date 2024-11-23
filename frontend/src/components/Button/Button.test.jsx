import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Button from './Button';

describe('Button Component', () => {
  test('renders button with the correct label', () => {
    render(<Button label="Click Me" />);
    const buttonElement = screen.getByText(/click me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('calls onClick handler when clicked', () => {
    const mockOnClick = jest.fn();
    render(<Button label="Click Me" onClick={mockOnClick} />);
    const buttonElement = screen.getByText(/click me/i);
    fireEvent.click(buttonElement);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('applies the correct class based on props', () => {
    render(<Button label="Primary Button" className="primary" />);
    const buttonElement = screen.getByText(/primary button/i);
    expect(buttonElement).toHaveClass('primary');
  });

  test('is disabled when the disabled prop is true', () => {
    render(<Button label="Disabled Button" disabled />);
    const buttonElement = screen.getByText(/disabled button/i);
    expect(buttonElement).toBeDisabled();
  });

  test('matches snapshot', () => {
    const { asFragment } = render(<Button label="Snapshot Test" />);
    expect(asFragment()).toMatchSnapshot();
  });
});