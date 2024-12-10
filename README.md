# 1. Build the Express.js Docker Image

Build the Docker image for the Express.js application using the provided Dockerfile.

`docker build -t me/express-demo-app .`

# 2. Create Docker Network

Create a dedicated Docker network to allow containers to communicate seamlessly.

`docker network create my-demo-app-network`

Verify the network creation:

`docker network ls`

# 3. Run the Express.js Application Container

Start the Node.js application container and connect it to the MySQL container via the Docker network `my-demo-app-network`.

You will need to change the ports for this to work. You can map the Node.js application container to a different port, such as `5000`.

Ensure you replace the `DB_HOST`, `DB_USER`, `DB_PASSWORD`, and `DB_DATABASE` environment variables with the correct values.

Here, `DB_HOST` would be the name of the MySQL container. Within the same network, Docker will resolve the container name to the local IP address automatically. This is why we use the `--network` flag to connect both containers to the same network. You can find more information by running `docker network inspect my-demo-app-network`.

```bash
# To start the Express.js application
docker run -p 5000:5000 --name demo-node-app -e DB_HOST=demo-mysql-container -e DB_USER=user -e DB_PASSWORD=password -e DB_DATABASE=mydb --network my-demo-app-network me/express-demo-app
```
# 4. Initialize the MySQL Database

Ensure you have an `init.sql` file in the `mysql-init` directory. This file contains the SQL commands to create the database and table need for the backend.

Have a look a the `init.sql` file in the `mysql-init` directory.

# 5. Run MySQL Container

Run the MySQL container with the initialization script at `demo-node-app/mysql-init`. You will need to change the path to the directory on your computer containing the `init.sql` file.

**Volume mounting**

We are using a docker feature called `volume mounting` to mount the `mysql-init` directory to the `/docker-entrypoint-initdb.d` directory in the MySQL container. What this means the folder on the host machine will be mounted to the MySQL container and the SQL scripts in the folder will be executed when the MySQL container starts.

Read more here: https://docs.docker.com/storage/volumes/ and https://github.com/docker-library/docs/tree/master/mysql#initializing-a-fresh-instance


```bash
# To start a MYSQL instance
docker run --name demo-mysql-container -e MYSQL_ROOT_PASSWORD=myrootpassword  -e MYSQL_DATABASE=mydb -e MYSQL_USER=user -e MYSQL_PASSWORD=password -p 3306:3306 --network my-demo-app-network -v "D:/workspace/mission-ready/L5-Advanced-Developers/week-05/demo-node-app/mysql-init:/docker-entrypoint-initdb.d" -d mysql
```

### Notes:
- Volume Mounting (-v): Ensure the path `D:/workspace/mission-ready/L5-Advanced-Developers/week-05/demo-node-app/docker-init` is correct and points to the directory containing `init.sql`.
- Please make sure the path is correct for your system.

# 6. Check the `/todos` Endpoint in the Browser
Open your browser and navigate to `http://localhost:5000/todos`. You should see a JSON response with the todos data.

# Troubleshooting

## Common Issues

### Connection Refused Errors

- Issue `Error: connect ECONNREFUSED 172.19.0.3:3306`
  - Solution:
    - Ensure the MySQL container is running.
    - Verify that both containers are on the same Docker network.
    - Check that the environment variables are correctly set.
    - Use container names instead of IP addresses for `DB_HOST`.

### Volume Mounting Issues on Windows

- Issue: Docker cannot find the mysql-init directory.
  - Solution:
    - If on windows, use absolute paths with forward slashes in the `-v` flag.
    - If on Linux/Mac, use backslashes in the `-v` flag.
    - Ensure Docker Desktop has access to the drive where the project resides.

### MySQL Initialization Scripts Not Running

- Issue: The todos table does not exist despite having `init.sql`.
  - Solution:
    - Ensure the `init.sql` file is correctly placed in the mounted directory.
    - Check the MySQL container logs for any errors.
