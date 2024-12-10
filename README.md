# To create a docker image from a dockerfile
docker build -t sebin/express-demo-app .

# To start a container from the image
docker run -p 4000:3000 --name demo-node-app sebin/express-demo-app


# To start a MYSQL instance
docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=myrootpassword  -e MYSQL_DATABASE=mydb -e MYSQL_USER=user -e MYSQL_PASSWORD=password  -d mysql:tag 