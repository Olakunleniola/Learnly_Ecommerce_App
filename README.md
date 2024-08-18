# E-commerce App

This is an E-commerce application built with a Node.js backend and a Vue.js frontend. It includes user authentication, product management, and responsive design using Tailwind CSS.

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:
- Node.js
- npm (Node Package Manager)
- Git

### Cloning the Repository

```bash
git clone https://github.com/Olakunleniola/Learnly_Ecommerce_App.git
```

```bash
cd Learnly_Ecommerce_App
```

## Backend Setup
To set up and run the backend server:

### Navigate to the backend directory:
```bash
cd ecommerce-app-backend
```

### Install the required dependencies:
```bash
npm install
```
### Run the server:
```bash
node server.js
```
The backend server should now be running on http://localhost:3000.

### Available Backend Routes

* POST /login: User authentication.
* GET /products: Retrieve a list of all products.
* GET /products/: Retrieve details of a single product.
* POST /products: Add a new product (requires authentication).
* PUT /products/: Edit an existing product (requires authentication).
* DELETE /products/: Delete a product (requires authentication).

## Frontend Setup
To set up and run the frontend application:

### Navigate to the frontend directory:
```BASH
cd ../ecommerce-app-frontend
```

### Install the required dependencies:
```bash
npm install
```

If you haven't initialized Tailwind CSS, do so by running:

```bash
npx tailwindcss init
```

Ensure your tailwind.config.js is properly set up. You should have the following content:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### Run the frontend development server:

```bash
npm run serve
```

The frontend application should now be running on http://localhost:8080.

## Project Structure
* ecommerce-app-backend: Contains the backend code.
* ecommerce-app-frontend: Contains the frontend code.

## Login Credentials
Login to app using the credentials below.

* Email: devlakunle@learnly.com,
* Password: 1234567890

## License
This project is licensed under the MIT [License](https://).
