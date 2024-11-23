import { render, screen, fireEvent } from '@testing-library/react';
import ProductPage from './ProductPage';

describe('ProductPage', () => {
  const product = {
    name: 'Awesome Product',
    description: 'This is an awesome product.',
    price: '99.99',
    imageUrl: 'http://example.com/product.jpg',
  };

  test('renders product name, description, and price', () => {
    render(<ProductPage product={product} />);
    expect(screen.getByText(/Awesome Product/i)).toBeInTheDocument();
    expect(screen.getByText(/This is an awesome product./i)).toBeInTheDocument();
    expect(screen.getByText(/\$99.99/i)).toBeInTheDocument();
  });

  test('displays product image', () => {
    render(<ProductPage product={product} />);
    expect(screen.getByAltText(/Awesome Product/i)).toHaveAttribute('src', product.imageUrl);
  });

  test('clicking add to cart button works', () => {
    render(<ProductPage product={product} />);
    fireEvent.click(screen.getByText(/Add to Cart/i));
    expect(screen.getByText(/Add to Cart/i)).toBeInTheDocument();
  });
});