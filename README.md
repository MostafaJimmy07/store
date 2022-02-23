                                  <!-- Storefront Backend API -->

# This is a REST API simulating an e-commerce backend based on three models: Products, Orders and Users. A detailed list of the endpoints and actions available can be found in the REQUIREMENTS.md file.

# Technology used:

    -Node js
    -Express js
    -Typescript
    -postgres DB
    -jasmine

# DevDependencies:

    -"@types/bcrypt": "^5.0.0",
    -"@types/express": "^4.17.13",
    -"@types/jasmine": "^3.10.3",
    -"@types/jsonwebtoken": "^8.5.8",
    -"@types/morgan": "^1.9.3",
    -"@types/node": "^17.0.15",
    -"@types/pg": "^8.6.4",
    -"@types/supertest": "^2.0.11",
    -"jasmine": "^4.0.2",
    -"jasmine-spec-reporter": "^7.0.0",
    -"nodemon": "^2.0.15",
    -"prettier": "^2.5.1",
    -"supertest": "^6.2.2",
    -"ts-node": "^10.4.0",
    -"typescript": "^4.5.5"

# Dependencies:

     -"bcrypt": "^5.0.1",
     -"db-migrate": "^0.11.13",
     -"db-migrate-pg": "^1.2.2",
     -"dotenv": "^16.0.0",
     -"express": "^4.17.2",
     -"helmet": "^5.0.2",
     -"jsonwebtoken": "^8.5.1",
     -"morgan": "^1.10.0",
     -"pg": "^8.7.3"

# Setup

- Database config :
  The API connects to a postgres database. As a first step, it is necessary to create two databases (development and test) on your local machine. Run the command psql postgres in terminal to open the postgres CLI. Then run the following:

  CREATE USER shopping_user WITH PASSWORD 'userpassword';
  CREATE DATABASE shopping;
  GRANT ALL PRIVILEGES ON DATABASE shopping TO shopping_user;
  CREATE DATABASE shopping_test;
  GRANT ALL PRIVILEGES ON DATABASE shopping_test TO shopping_user;

- To make sure the API can connect to the db it is necessary to create a (database.json) file with the following format:
  {
  "defualtEnv" : {"ENV":"NODE_ENV"},

      "dev":
       {
          "driver":"pg",
          "host":{"ENV":"POSTGRES_HOST"},
          "port":{"ENV":"POSTGRES_PORT"},
          "database":{"ENV":"POSTGRES_DB"},
          "user":{"ENV":"POSTGRES_USER"},
          "password":{"ENV":"POSTGRES_PASSWORD"}
      },

      "test":
      {
      "driver":"pg",
      "host":{"ENV":"POSTGRES_HOST"},
      "port":{"ENV":"POSTGRES_PORT"},
      "database":{"ENV":"POSTGRES_TEST_DB"},
      "user":{"ENV":"POSTGRES_USER"},
      "password":{"ENV":"POSTGRES_PASSWORD"}

      }

}

# Environment variables :

Port =3000
NODE_ENV=dev
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=shopping
POSTGRES_TEST_DB=shopping_test
POSTGRES_USER=shopping_user
POSTGRES_PASSWORD=userpassword

BCRYPT_PASSWORD=your-secret-hash-password-123
SALT_ROUNDS=10.
TOKEN_SECRET=super-secure-jwt-secret.

# Installing dependencies :

- all the project dependencies can be installed using (npm install).

# Run Server (Build & start):

-npm run start.

# Format:

-npm run format.

# test:

-npm run test.

# migration :

- migrate up : (npm run migrate:up)
- migrate down : (npm run migrate:down).
- migrate reset : (npm run migrate:reset).

# Build :

- npm run build

# Lint

- npm run lint
- npm run lint:fix
