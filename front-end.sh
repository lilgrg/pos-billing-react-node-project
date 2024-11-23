#!/bin/bash

# Set the base directory
BASE_DIR="src"

# Create the main directories
mkdir -p $BASE_DIR/{assets/{images,icons,fonts,styles},components,pages,services/{api,utils},hooks,tests/{__mocks__,integration,unit},router}

# Create placeholder files for assets
touch $BASE_DIR/assets/styles/{variables.scss,mixins.scss,themes.scss}

# Create example components
mkdir -p $BASE_DIR/components/{Button,InputField,Modal}
touch $BASE_DIR/components/Button/{Button.jsx,Button.module.scss,Button.test.jsx}
touch $BASE_DIR/components/InputField/{InputField.jsx,InputField.module.scss,InputField.test.jsx}
touch $BASE_DIR/components/Modal/{Modal.jsx,Modal.module.scss,Modal.test.jsx}

# Create example pages
mkdir -p $BASE_DIR/pages/{HomePage,ProductPage,CheckoutPage}
touch $BASE_DIR/pages/HomePage/{HomePage.jsx,HomePage.module.scss,HomePage.test.jsx}
touch $BASE_DIR/pages/ProductPage/{ProductPage.jsx,ProductPage.module.scss,ProductPage.test.jsx}
touch $BASE_DIR/pages/CheckoutPage/{CheckoutPage.jsx,CheckoutPage.module.scss,CheckoutPage.test.jsx}

# Create placeholder services
touch $BASE_DIR/services/api/{productsService.js,checkoutService.js,authService.js}
touch $BASE_DIR/services/utils/{dateFormatter.js,validation.js}
touch $BASE_DIR/services/config.js

# Create placeholder hooks
touch $BASE_DIR/hooks/{useAuth.js,useFetch.js,useDebounce.js}

# Create placeholder tests
touch $BASE_DIR/tests/{setupTests.js,__mocks__/mockData.js,integration/checkout.test.jsx,unit/button.test.jsx}

# Create router files
touch $BASE_DIR/router/{routes.js,PrivateRoute.jsx}

# Create the main app files
touch $BASE_DIR/{App.jsx,index.js}

echo "React folder structure created successfully!"