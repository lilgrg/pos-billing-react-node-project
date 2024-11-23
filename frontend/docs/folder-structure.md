Frontend Folder Structure

	•	/src
Main source directory containing all the React application code.
	•	components/
Contains reusable UI components like buttons, input fields, and modals to promote modularity and reduce code duplication.
	•	Button.jsx
A reusable button component for different actions throughout the application.
	•	InputField.jsx
A generic input field component with validation and styling.
	•	pages/
Contains page-specific components representing views or screens. Each page is structured as a single unit for routing and navigation.
	•	Homepage.jsx
The landing page of the application.
	•	CheckoutPage.jsx
Manages the user interface for processing purchases.
	•	services/
Manages API calls and utility functions to interact with the backend.
	•	api/
Houses files for specific APIs such as authentication or product services.
	•	authService.js
Handles user login, logout, and authentication logic.
	•	productService.js
Fetches product data from the backend.
	•	utils/
Contains helper functions and reusable utilities like date formatting and validation.
	•	dateFormatter.js
Formats dates into readable strings for UI rendering.
	•	validation.js
Contains functions for input validation.
	•	hooks/
Custom React hooks to encapsulate common logic and make components cleaner.
	•	useFetch.js
Custom hook for fetching data with error handling and loading states.
	•	useAuth.js
Provides authentication logic throughout the application.
	•	App.jsx
The root component containing the main routing logic and application layout.
	•	index.js
Entry point for the React application that renders the app into the DOM.

Backend Folder Structure

	•	/controllers
Handles request logic and contains methods corresponding to API endpoints.
	•	CustomerController.js
Manages customer-related logic like adding or updating customer details.
	•	ProductController.js
Handles product-related requests like fetching product lists or details.
	•	/models
Defines the database schema and interacts with the database.
	•	Customer.js
Schema definition for storing customer information.
	•	Product.js
Schema for product details like name, price, and inventory.
	•	/routes
Defines API endpoints and maps them to controller methods.
	•	customerRoutes.js
Routes related to customer operations like /addCustomer or /getCustomer.
	•	productRoutes.js
Product-related routes like /getProducts.
	•	/services
Contains business logic and utility methods to separate concerns from controllers.
	•	customerService.js
Implements logic for managing customer data in the database.
	•	productService.js
Handles fetching, updating, and deleting product records.
	•	/config
Configuration files for environment variables and database connections.
	•	dbConfig.js
Configures database connection settings using environment variables.
	•	envConfig.js
Manages environment-specific variables like API keys.
	•	server.js
Entry point for the Node.js backend server. Initializes middleware, routes, and database connections.
