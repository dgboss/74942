// Script to create database user on initialization
db.createUser(
    {
        user: "apiuser",
        pwd: "apipassword",
        roles: [
            {
                role: "readWrite",
                db: "74942app"
            }
        ]
    }
);