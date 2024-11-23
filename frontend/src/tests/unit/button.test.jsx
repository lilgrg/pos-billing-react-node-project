import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../components/Button';

describe('Button Component', () => {
  it('renders the button with given text', () => {
    render(<Button label="Click Me" onClick={() => {}} />);
    const buttonElement = screen.getByText(/Click Me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it('calls the onClick function when clicked', () => {
    const handleClick = jest.fn();
    render(<Button label="Submit" onClick={handleClick} />);
    const buttonElement = screen.getByText(/Submit/i);

    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disables the button when disabled prop is true', () => {
    render(<Button label="Disabled" onClick={() => {}} disabled />);
    const buttonElement = screen.getByText(/Disabled/i);

    expect(buttonElement).toBeDisabled();
  });

  it('applies additional classNames when passed as props', () => {
    render(
      <Button label="Styled" onClick={() => {}} className="custom-class" />
    );
    const buttonElement = screen.getByText(/Styled/i);

    expect(buttonElement).toHaveClass('custom-class');
  });
});