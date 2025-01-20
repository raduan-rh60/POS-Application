# POS Management System

## Overview
The POS (Point of Sale) Management System is a robust application designed to manage inventory, sales, and customer transactions efficiently. The system is built using Angular for the frontend and Spring Boot for the backend, providing a modern, scalable, and maintainable architecture.

## Features
- **Product Management**: Add, update, delete, and list products.
- **Category and Brand Management**: Organize products by categories and brands.
- **Inventory Management**: Track stock levels in real-time.
- **Sales Transactions**: Process customer purchases with ease.
- **Reporting**: Generate sales and inventory reports.
- **User Authentication**: Secure login system for admin.

---

## Technology Stack

### Frontend (Angular)
- **Framework**: Angular 18
- **Styling**: CSS/SCSS, Bootstrap
- **API Integration**: HTTPClient for RESTful APIs
- **State Management**: Angular Services

### Backend (Spring Boot)
- **Framework**: Spring Boot
- **Database**: MySQL
- **ORM**: Hibernate/JPA
- **Build Tool**: Maven

---

## Installation and Setup

### Prerequisites
- Node.js and npm
- Angular CLI
- Java JDK 17+
- Maven
- MySQL Database

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/pos-backend.git
   cd pos-backend
   ```
2. Configure the database:
   - Update the `application.properties` file with your MySQL database credentials:
     ```properties
     spring.datasource.url=jdbc:mysql://localhost:3306/pos_db
     spring.datasource.username=root
     spring.datasource.password=yourpassword
     spring.jpa.hibernate.ddl-auto=update
     ```
3. Build and run the backend:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   git clone https://github.com/your-username/pos-frontend.git
   cd pos-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Angular development server:
   ```bash
   ng serve
   ```
4. Open the application in your browser at `http://localhost:4200`.

---

## API Endpoints

### Product APIs
- **GET** `/api/products`: Fetch all products
- **POST** `/api/products`: Add a new product
- **PUT** `/api/products/{id}`: Update a product
- **DELETE** `/api/products/{id}`: Delete a product

### Category APIs
- **GET** `/api/categories`: Fetch all categories
- **POST** `/api/categories`: Add a new category

### Brand APIs
- **GET** `/api/brands`: Fetch all brands
- **POST** `/api/brands`: Add a new brand

---

## Screenshots
Include some screenshots of your application to showcase its features:

1. **Product List Page**:
   ![Product List](screenshots/product-list.png)

2. **Add Product Form**:
   ![Add Product](screenshots/add-product.png)

3. **Sales Dashboard**:
   ![Sales Dashboard](screenshots/sales-dashboard.png)

---

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push the branch.
4. Open a pull request with a detailed description of your changes.

---

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact
For any inquiries or support, contact:
- **Email**: your-email@example.com
- **GitHub**: [your-username](https://github.com/your-username)

