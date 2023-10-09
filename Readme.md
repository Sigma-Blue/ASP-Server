# Node Express Backend with PostgreSQL and Prisma ORM

This repository provides a headstart for developing a Node.js backend application using Express, PostgreSQL, and Prisma ORM. It provides a structured foundation with boilerplate code and best practices to kickstart your development process.

> Note:  Don't forget, this structure could be highly opinionated and you can always modify it to suit your needs.

## Tech Stack


-  [Node.js](https://nodejs.org/en/)
-  [Express](https://expressjs.com/)
-  [PostgreSQL](https://www.postgresql.org/)
-  [Prisma ORM](https://www.prisma.io/)
-  [JWT](https://jwt.io/)
-  [Bcrypt](https://www.npmjs.com/package/bcrypt)
-  [Joi](https://www.npmjs.com/package/joi)


## Prerequisites

Make sure you have the following dependencies installed on your machine:

-  Node.js - [Download and install Node.js](https://nodejs.org/en/download/)
-  PostgreSQL - [Download and install PostgreSQL](https://www.postgresql.org/download/)

## Getting Started

1. Clone this repository to your local machine using the following command:

   ```bash
   git clone https://github.com/Velogan-Boy/node-headstart.git <project_name>

   ```

2. Navigate to the project directory:

   ```bash
   cd <project_name>
   ```

3. Install the dependencies:

   ```bash
      npm install
   ```

4. Create a new PostgreSQL database for your project.
5. Modify env files in the root directory of the project.

6. Modify the `schema.prisma` file in the `prisma` directory to match your database schema.

7. Run the following command to generate the Prisma client:

   ```bash
   npx prisma generate
   ```

8. Run the following command to start the development server:

   ```bash
   npm run dev
   ```
   
The server should now be running at http://localhost:5000.


> Note: Don't forget to uncomment the .env files in  .gitignore file if you want to push your code to a remote repository.

## Happy Coding!




