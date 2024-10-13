# Warehouse Frontend

## Description
This repository contains the frontend of the Warehouse application, built using React. This application allows users to [briefly describe what your application does, e.g., manage inventory, track shipments, etc.].

## Prerequisites
Before you begin, ensure you have met the following requirements:
- [Node.js](https://nodejs.org/en/) (version 14.x or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Cloning the Repository

To clone this repository, follow these steps:

1. Open your terminal (Command Prompt, PowerShell, Terminal, etc.).
2. Navigate to the directory where you want to clone the repository.
3. Run the following command:

   ```bash
   git clone https://github.com/Gaurav-160/warehouse-frontend.git
   ```

4. Change into the project directory:

   ```bash
   cd warehouse-frontend
   ```

## Installing Dependencies

Once you have cloned the repository, you need to install the necessary dependencies. Run the following command:

```bash
npm install
```

## Running the Application

To start the application, run:

```bash
npm start
```

This command will start the development server and open the application in your default web browser. The application is usually accessible at `http://localhost:3000`.

## Configuring Base URL for Local Development

In the `GodownContext.js` and `AuthContext.js` files, you will find a variable named `baseUrl`. Change this variable to point to your local Django server if you are running the application locally.

```javascript
const baseUrl = "https://warehouse24.pythonanywhere.com"; // Production URL
// const baseUrl = "http://localhost:8000"; // Uncomment this line to use local Django server
```

Make sure to uncomment the local URL line when you are developing locally.

## Backend Repository
To run the backend for this application, you can find the Django server repository [here](https://github.com/Gaurav-160/warehouse-backend).
