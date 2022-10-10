- To create a Docker container with the name _mernt-chat-app_ for a MongoDB database that runs on port 27017:
  1.  Open your Terminal and run : `docker run -p 27017:27017 --name mernt-chat-app -d mongo`
  2.  Then open the MongoDB Compass apps and connect to the URI _mongodb://localhost:27017_
  3.  You should connect successfully and see an empty database:
