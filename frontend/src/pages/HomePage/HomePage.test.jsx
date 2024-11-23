import { render, screen } from '@testing-library/react';
import Homepage from './HomePage';

describe('HomePage', () => {
  test('renders homePage header', () => {
    render(<Homepage />);
    expect(screen.getByText(/Welcome to Our Store/i)).toBeInTheDocument();
    expect(screen.getByText(/Your one-stop solution for all your shopping needs./i)).toBeInTheDocument();
  });

  test('renders features section', () => {
    render(<HomePage />);
    expect(screen.getByText(/Quality Products/i)).toBeInTheDocument();
    expect(screen.getByText(/Fast Delivery/i)).toBeInTheDocument();
    expect(screen.getByText(/Customer Support/i)).toBeInTheDocument();
  });

  test('renders footer', () => {
    render(<HomePage />);
    expect(screen.getByText(/&copy; 2024 Our Store. All rights reserved./i)).toBeInTheDocument();
  });
});