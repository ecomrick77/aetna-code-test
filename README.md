# Aetna Code Test

This project provides a basic REST API for listing movies and retrieving details. It's written in Node.js and containerized in Docker.

## Installation

This installation requires Docker and Docker Compose installed as prerequisites. 

```
$ docker-compose up -d --build
```

This will launch 3 containers:

- movie-api (port 3030)
- movie-list-service (microservice)
- movie-details-service (microservice)

### Endpoints:

- http://localhost:3030/movies[?page=10]
- http://localhost:3030/movies/genre[?page=10]
- http://localhost:3030/movies/year[?page=10]
- http://localhost:3030/movie/[imdbId]