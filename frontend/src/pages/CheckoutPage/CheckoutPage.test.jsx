import { render, screen, fireEvent } from '@testing-library/react';
import CheckoutPage from './CheckoutPage';

describe('CheckoutPage', () => {
  test('renders checkout form', () => {
    render(<CheckoutPage />);
    
    // Check if form fields are rendered
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Shipping Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Payment Method/i)).toBeInTheDocument();
  });

  test('allows input changes', () => {
    render(<CheckoutPage />);
    
    // Simulate user input
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Shipping Address/i), { target: { value: '123 Main St' } });
    
    // Check if input fields are updated correctly
    expect(screen.getByLabelText(/Full Name/i).value).toBe('John Doe');
    expect(screen.getByLabelText(/Email Address/i).value).toBe('john@example.com');
    expect(screen.getByLabelText(/Shipping Address/i).value).toBe('123 Main St');
  });

  test('submits form with correct data', () => {
    render(<CheckoutPage />);
    
    // Simulate user input
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'jane@example.com' } });
    fireEvent.change(screen.getByLabelText(/Shipping Address/i), { target: { value: '456 Oak St' } });
    
    // Mock form submission
    const submitButton = screen.getByText(/Place Order/i);
    fireEvent.click(submitButton);
    
    // Check if the form data is being logged (you can spy on console.log if needed)
    expect(console.log).toHaveBeenCalledWith('Checkout submitted', {
      name: 'Jane Doe',
      email: 'jane@example.com',
      address: '456 Oak St',
      paymentMethod: 'Credit Card'
    });
  });
});