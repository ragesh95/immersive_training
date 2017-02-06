1. Create project structure
2. Open a git bash window, run vagrant, ssh to vagrant, and cd to client folder
3. From client folder, run:

npm install

4. From client folder, run:

sudo npm i -g http-server
sudo npm i -g gulp

5. from client folder, run:

gulp

6. Open another git bash window, ssh to vagrant, and cd to react-starter/client/dist

7. From the dist folder, run:

http-server

8. Open a browser and type the following URL:

http://localhost:8080