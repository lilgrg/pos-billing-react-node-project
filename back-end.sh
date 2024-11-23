#!/bin/bash

# Set the base directory
BASE_DIR="backend"

# Create the main directories
mkdir -p $BASE_DIR/{controllers,models,routes,services,middleware,utils,config,tests/{unit,integration}}

# Create placeholder files for controllers
touch $BASE_DIR/controllers/{ProductController.js,TransactionController.js,CustomerController.js}

# Create placeholder files for models
touch $BASE_DIR/models/{Product.js,Customer.js,Transaction.js}

# Create placeholder files for routes
touch $BASE_DIR/routes/{productRoutes.js,transactionRoutes.js,customerRoutes.js}

# Create placeholder files for services
touch $BASE_DIR/services/{InventoryService.js,TransactionService.js,CustomerService.js}

# Create placeholder files for middleware
touch $BASE_DIR/middleware/{authMiddleware.js,errorHandler.js,validationMiddleware.js}

# Create placeholder files for utils
touch $BASE_DIR/utils/{logger.js,validator.js}

# Create placeholder files for config
touch $BASE_DIR/config/{dbConfig.js,envConfig.js}

# Create placeholder files for tests
touch $BASE_DIR/tests/unit/{productController.test.js,transactionController.test.js}
touch $BASE_DIR/tests/integration/{productRoutes.test.js,transactionRoutes.test.js}

# Create additional essential files
touch $BASE_DIR/{server.js,app.js}

echo "Node.js backend folder structure created successfully!"