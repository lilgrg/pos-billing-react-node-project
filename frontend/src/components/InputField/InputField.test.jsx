import { render, screen, fireEvent } from '@testing-library/react';
import InputField from './InputField'; // Make sure to adjust the path as necessary
import '@testing-library/jest-dom/extend-expect';

describe('InputField Component', () => {
  test('renders the input field with label', () => {
    render(<InputField label="Username" value="" onChange={() => {}} />);
    
    // Check if the label is displayed
    expect(screen.getByText(/Username/i)).toBeInTheDocument();
    
    // Check if the input field is in the document
    expect(screen.getByPlaceholderText('Enter Username')).toBeInTheDocument();
  });

  test('shows error message when the input is touched and empty (required field)', () => {
    render(
      <InputField
        label="Username"
        value=""
        onChange={() => {}}
        required
        errorMessage="This field is required"
      />
    );
    
    // Simulate blur event to mark the input as touched
    fireEvent.blur(screen.getByRole('textbox'));
    
    // Check if the error message is displayed
    expect(screen.getByText(/This field is required/i)).toBeInTheDocument();
  });

  test('calls onChange function when value is typed', () => {
    const handleChange = jest.fn();
    render(
      <InputField
        label="Username"
        value=""
        onChange={handleChange}
        required
        errorMessage="This field is required"
      />
    );
    
    // Simulate user typing into the input field
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'John' } });
    
    // Check if onChange is called with the correct value
    expect(handleChange).toHaveBeenCalledWith('John');
  });

  test('input field has error class when there is an error', () => {
    render(
      <InputField
        label="Username"
        value=""
        onChange={() => {}}
        required
        errorMessage="This field is required"
      />
    );
    
    // Trigger blur event to show the error
    fireEvent.blur(screen.getByRole('textbox'));
    
    // Check if the input field has the error class
    expect(screen.getByRole('textbox')).toHaveClass('input-error');
  });
});