# CleverHome

CleverHome is a full-stack smart home web application built as a
learning project. It allows users to create an account, add simulated
smart home devices, control them through a dashboard, and view simulated
device information.

The project was created to learn and practise **React, Next.js,
TypeScript, backend development, database integration, and
component-based development**.

## Features

-   User registration and login
-   Session-based authentication
-   Personal device management
-   Add, edit, and delete devices
-   Device on/off controls
-   Light colour control
-   Fan RPM control
-   Radiator temperature control
-   Thermostat temperature control
-   Digital smart device simulation
-   Simulated brightness, power consumption, RPM, temperature, and
    heating state
-   PostgreSQL data storage
-   Responsive interface for desktop and mobile

## Supported Devices

  Device       Controls / Information
  ------------ -----------------------------------------------
  Light        On/off, colour, brightness, power consumption
  Fan          On/off, RPM, power consumption
  Radiator     On/off, temperature, heating state
  Thermostat   Temperature control and simulated behaviour

## Technologies

-   **React** -- interactive UI and reusable components
-   **Next.js** -- application framework and API routes
-   **TypeScript** -- type-safe development
-   **PostgreSQL** -- relational database
-   **Prisma ORM** -- database communication
-   **bcrypt** -- password hashing
-   **CSS** -- application styling

## Running the Project Locally

This project is intended to be run locally and is **not deployed as a
production application**.

### Requirements

Make sure you have installed:

-   Node.js
-   npm
-   PostgreSQL

### 1. Clone the repository

``` bash
git clone https://github.com/kr1ss4o/clever-home-app.git
cd clever-home-app
```

### 2. Install dependencies

``` bash
npm install
```

### 3. Configure environment variables

Create the required environment file in the project root and add your
local PostgreSQL connection string.

For example:

``` env
DATABASE_URL="your-postgresql-connection-string"
```

Do not commit your environment file or any passwords/secrets to GitHub.

### 4. Run the project setup

The project includes a setup script for preparing the local development
environment:

``` bash
npm run setup
```

### 5. Start the development server

``` bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Simulation

CleverHome uses a digital simulator instead of physical smart home
hardware.

The simulator is integrated with the application and generates
additional values based on the current device state. This allows the
project to demonstrate smart home behaviour while keeping the project
completely software-based.

The simulator currently supports:

-   Light behaviour
-   Fan behaviour
-   Radiator behaviour
-   Thermostat behaviour

## Development Approach

The project was developed independently with a focus on learning React
and Next.js through practical implementation.

The development process included:

1.  Analysing the project requirements
2.  Creating the UI/UX prototype in Figma
3.  Implementing the frontend
4.  Connecting the backend and database
5.  Implementing authentication
6.  Creating the device simulator
7.  Testing and improving the application

## Project Documentation

The project documentation covers the complete development process:

-   Analysis
-   Advice
-   Design
-   Realisation
-   Validation
-   Project Organisation
-   Communication and Reporting
-   Exploratory Research
-   Personal Leadership

## Repository

[GitHub Repository](https://github.com/kr1ss4o/clever-home-app)

## Author

Developed as a Fontys ICT project.
