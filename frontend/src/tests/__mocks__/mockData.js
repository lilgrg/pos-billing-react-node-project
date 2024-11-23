export const mockProducts = [
    {
      id: 1,
      name: 'Product 1',
      price: 20.0,
      quantity: 100,
      description: 'A description of product 1',
    },
    {
      id: 2,
      name: 'Product 2',
      price: 35.5,
      quantity: 50,
      description: 'A description of product 2',
    },
    {
      id: 3,
      name: 'Product 3',
      price: 12.75,
      quantity: 200,
      description: 'A description of product 3',
    },
  ];
  
  export const mockCart = [
    {
      productId: 1,
      quantity: 2,
      totalPrice: 40.0,
    },
    {
      productId: 2,
      quantity: 1,
      totalPrice: 35.5,
    },
  ];
  
  export const mockUser = {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@example.com',
    phoneNumber: '1234567890',
  };
  
  export const mockOrder = {
    orderId: 'ORD123',
    userId: 1,
    products: [
      { productId: 1, quantity: 2 },
      { productId: 2, quantity: 1 },
    ],
    totalAmount: 75.5,
    status: 'pending',
    orderDate: '2024-11-22',
  };