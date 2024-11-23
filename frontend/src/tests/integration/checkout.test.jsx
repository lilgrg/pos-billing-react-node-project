import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CheckoutPage from '../../pages/CheckoutPage';
import { mockCart, mockUser } from '../__mocks__/mockData';
import * as checkoutService from '../../services/api/checkoutService';

// Mock API Service
jest.mock('../../services/api/checkoutService', () => ({
  submitOrder: jest.fn(),
}));

describe('CheckoutPage Integration Tests', () => {
  beforeEach(() => {
    render(<CheckoutPage />);
  });

  it('renders checkout form with user and cart data', () => {
    // Check user information rendering
    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();

    // Check cart items rendering
    mockCart.forEach((item) => {
      expect(screen.getByText(`Product ${item.productId}`)).toBeInTheDocument();
      expect(screen.getByText(`Quantity: ${item.quantity}`)).toBeInTheDocument();
      expect(screen.getByText(`$${item.totalPrice}`)).toBeInTheDocument();
    });
  });

  it('allows the user to submit an order', async () => {
    checkoutService.submitOrder.mockResolvedValueOnce({
      status: 200,
      data: { orderId: 'ORD123' },
    });

    // Simulate filling out the payment details
    fireEvent.change(screen.getByLabelText(/Card Number/i), { target: { value: '4111111111111111' } });
    fireEvent.change(screen.getByLabelText(/Expiration Date/i), { target: { value: '12/25' } });
    fireEvent.change(screen.getByLabelText(/CVV/i), { target: { value: '123' } });

    // Simulate order submission
    fireEvent.click(screen.getByRole('button', { name: /Place Order/i }));

    // Wait for API call
    await waitFor(() => expect(checkoutService.submitOrder).toHaveBeenCalledTimes(1));

    // Check success message
    expect(screen.getByText(/Order placed successfully!/i)).toBeInTheDocument();
  });

  it('shows an error message if order submission fails', async () => {
    checkoutService.submitOrder.mockRejectedValueOnce(new Error('Network error'));

    // Simulate order submission
    fireEvent.click(screen.getByRole('button', { name: /Place Order/i }));

    // Wait for error handling
    await waitFor(() => expect(screen.getByText(/Failed to place order/i)).toBeInTheDocument());
  });
});