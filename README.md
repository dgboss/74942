# 74942

This application has three components:
1. A React based frontend
2. A MongoDB database
3. A Flask based backend

To run the application:
1. Clone the repository from https://github.com/dgboss/74942
2. Open a command prompt to the root of the application.
3. Run locally using docker with the following command: `docker-compose up -d`

After running this command, the frontend application can be accessed in a web browser at http://localhost:3000.
The backend application is running at http://localhost:5000, but the sole endpoint, `/api` is only accessible from localhost:3000.

Caution: This application is currently configured to be run in a development setting. The application should not be deployed to a production environment as database names, usernames and passwords are contained within this repository to ease deployment in a development environment.

Instructions for User Story 3:
1. Run the application: `docker-compose up -d`
2. Access the MongoDB container: `docker exec -it mongo bash`
3. Login to mongo as root admin: `mongo -u admin -p`
4. Enter the password when prompted: `74942`
5. Select the database: `use 74942app`
6. Get a collection representing the number of API requests that have been logged: `collection = db.service_area_api_result`
7. Display a count of the collection: `collection.count()`
8. To quit the database connection: `quit()`
9. To exit the shell: `exit`

Frontend Unit Tests
1. Open a command prompt and go to the `./react_frontend` directory
2. npm install
3. npm run test
4. 'a' to run all tests