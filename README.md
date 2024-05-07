## Instructions

To run the project you just need to run the `execute.sh` file that you could find on the root of the project. Please make sure you met the requirements for this project and next execute the following command:

```bash
./execute.sh
```

This script will configure the database and execute both the backend and the frontend. If everything goes as expected you should be able to test the application on this [route](http://localhost:5173).

> The default postgres user with no password is used for this project. If you need to add security details to the database connection you could do that on `execute.sh:42`

## Project Requirements

To run the project, you will need the following software installed on your system:

- **PostgreSQL 16**: Make sure you have PostgreSQL installed, including the `psql` command.

- **Java 21**: Ensure that you have Java 21 installed. You can check your Java version by running `java -version` in your terminal.

- **Node.js 21**: Install Node.js 21, which includes the Node Package Manager (npm). You can verify your Node.js and npm versions by running `node -v` and `npm -v` respectively.

- **Netcat**: Install Netcat `nc` on your system. This allows the script to wait until the required postgresql service is up.

Please ensure that these requirements are met before running the project.