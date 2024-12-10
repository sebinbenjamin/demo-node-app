# To create a docker image from a dockerfile
docker build -t me/express-demo-app .

# To start a container from the image
<!-- You will need to change the ports for this to work -->
docker run -p 5000:5000 --name demo-node-app -e DB_HOST=http://localhost:3306 -e DB_USER=user -e DB_PASSWORD=password -e DB_DATABASE=mydb me/express-demo-app

# To start a MYSQL instance
docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=myrootpassword  -e MYSQL_DATABASE=mydb -e MYSQL_USER=user -e MYSQL_PASSWORD=password -p 3306:3306 -d mysql