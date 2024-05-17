-- User table
CREATE TABLE User (
    UserID INT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    DateOfBirth DATE NOT NULL,
    gender VARCHAR(10) NOT NULL
);

-- Customer table
CREATE TABLE Customer (
    UserID INT PRIMARY KEY,
    customerID INT NOT NULL,
    numberOfOrders INT NOT NULL,
    discountCode VARCHAR(10),
    discountStatus BOOLEAN
);

-- Food table
CREATE TABLE Food (
    FoodID INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price DECIMAL(8, 2) NOT NULL,
    quantity INT NOT NULL,
    cuisine VARCHAR(50) NOT NULL,
    calories INT NOT NULL,
    ingredients TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    image VARCHAR(100) NOT NULL,
    timeframe VARCHAR(50) NOT NULL
);

-- Inventory table
CREATE TABLE Inventory (
    FoodID INT PRIMARY KEY,
    foodQuantity INT NOT NULL
);

-- Review table
CREATE TABLE Review (
    customerID INT NOT NULL,
    foodID INT NOT NULL,
    rating INT NOT NULL,
    comments TEXT,
    date DATE NOT NULL
);

-- Reservation table
CREATE TABLE Reservation (
    ReservationID INT PRIMARY KEY,
    customerID INT NOT NULL,
    tableNo INT NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL
);

-- Table table
CREATE TABLE Table (
    TableNo INT PRIMARY KEY,
    TableLocation VARCHAR(50) NOT NULL
);

-- TableStatus table
CREATE TABLE TableStatus (
    TableNo INT NOT NULL,
    TableStatus VARCHAR(50) NOT NULL,
    Time TIME NOT NULL
);

-- Order/Cart table
CREATE TABLE OrderCart (
    CartID INT PRIMARY KEY,
    customerID INT NOT NULL,
    username VARCHAR(50) NOT NULL,
    foodname VARCHAR(50) NOT NULL,
    total DECIMAL(8, 2) NOT NULL,
    shipping DECIMAL(8, 2) NOT NULL,
    discount DECIMAL(8, 2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    type VARCHAR(50) NOT NULL
);

-- Employee table
CREATE TABLE Employee (
    UserID INT PRIMARY KEY,
    rank VARCHAR(50) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL
);

-- EmployeeSchedule table
CREATE TABLE EmployeeSchedule (
    UserID INT NOT NULL,
    schedule VARCHAR(50) NOT NULL,
    tasks TEXT NOT NULL
);