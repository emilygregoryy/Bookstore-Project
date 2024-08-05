## This is our implementation of our Online Bookstore for CST8319

## Requirements
- Node.js
- npm (Node Package Manager)

## INSTRUCTIONS:

## Create a user and a database following the user/pass/database;
  - user: 'user',
  - password: 'pass',
  - database: 'bookstore'

## USE bookstore;

## Create table in database using SQL statement;
## CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    author VARCHAR(255),
    price DECIMAL(10, 2),
    description TEXT
## );

## Insert falsified books into database using SQL statement;

## INSERT INTO books (title, author, price, description) VALUES
- ('The Phantom of the Opera', 'John Smith', 9.99, 'A captivating story that explores the depths of human emotion and resilience.'),
- ('Mystery of the Lost Treasure', 'Jane Doe', 8.49, 'An epic saga of heroes, villains, and the battle between good and evil.');

## In order to deploy, cd to frontend folder in terminal, and run "npm start" to deploy frontend , and then cd to backend folder in terminal and run "start server.js" to deploy the backend server.

## PROJECT STRUCTURE: Frontend Folder contains frontend components such as pages, styling, and Backend Folder contains components such as database connection and routing. 