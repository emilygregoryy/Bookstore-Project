# Online Bookstore Implementation for CST8319

## Requirements
- Node.js
- npm (Node Package Manager)
- MySQL

## Instructions

1. **Setting Up the Database**: 
   - Log in to MySQL: `mysql -u root -p`
   - Create the database: `CREATE DATABASE bookstore;`
   - Create the user and grant privileges:
     `CREATE USER 'user'@'localhost' IDENTIFIED BY 'pass';`
     `GRANT ALL PRIVILEGES ON bookstore.* TO 'user'@'localhost';`
     `FLUSH PRIVILEGES;`
   - Use the Database: `USE bookstore;`
   - Create the `users` Table: 
     ```sql
     CREATE TABLE users (
         id INT AUTO_INCREMENT PRIMARY KEY,
         username VARCHAR(255) NOT NULL UNIQUE,
         password VARCHAR(255) NOT NULL,
         email VARCHAR(255) NOT NULL UNIQUE
     );
     ```
   - Create the `books` Table: 
     ```sql
     CREATE TABLE books (
         id INT AUTO_INCREMENT PRIMARY KEY,
         title VARCHAR(255),
         author VARCHAR(255),
         price DECIMAL(10, 2),
         description TEXT
     );
     ```
   - Insert Falsified Books into the `books` Table: 
     ```sql
     INSERT INTO books (title, author, price, description) VALUES
     ('The Phantom of the Opera', 'John Smith', 9.99, 'A captivating story that explores the depths of human emotion and resilience.'),
     ('Mystery of the Lost Treasure', 'Jane Doe', 8.49, 'An epic saga of heroes, villains, and the battle between good and evil.');
     ```

2. **Setting Up the Project**:
   - Clone the Repository: `git clone https://github.com/emilygregoryy/Bookstore-Project.git` then `cd OnlineBookstoreProject`
   - Install Dependencies:
     - For the backend: `cd backend && npm install`
     - For the frontend: `cd ../frontend && npm install`

3. **Running the Application**:
   - Start the Backend Server:
     - Navigate to the `backend` folder in your terminal: `cd backend && node server.js`
     - The backend server should now be running on `http://localhost:5000`.
   - Start the Frontend:
     - Open a new terminal and navigate to the `frontend` folder: `cd ../frontend && npm start`
     - The frontend should now be running on `http://localhost:3000`.

4. **Project Structure**:
   - **Frontend Folder**: Contains frontend components such as pages, styling, and logic.
   - **Backend Folder**: Contains backend components such as database connection, routing, and authentication logic.

5. **Additional Notes**:
   - Users can browse the list of inventory, view books descriptions, and add and delete books from their cart.
   - Users can perform a simulated checkout by entering their contact information, and receiving an order number after purchase. 
   - After successful registration, users can log in to access the Admin Dashboard.
   - The Admin Dashboard allows CRUD operations on the books inventory.
   - The logout button is available on the Admin Dashboard, which redirects to the home page after logging out.
