const axios = require('axios');

class moviesController{

    getMovies(req, res){
        const pageNum = req.query.page !== undefined ? req.query.page : 0
        let sortOrder = ''
        if(req.path === '/movies/genre'){
            sortOrder='genre'
        } else if(req.path === '/movies/year'){
            sortOrder='year'
        }

        axios.get(`http://movie-list-service:3031/?sort=${sortOrder}&page=${pageNum}`)
            .then(function (movies){
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(movies.data));
            })
            .catch(function(error){
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({error: error}));
            })
    }

    getMovieDetails(req, res){
        const imdbId = req.params.imdbId
        axios.get(`http://movie-details-service:3032/${imdbId}`)
            .then(function (movies){
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(movies.data));
            })
            .catch(function(error){
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({error: error}));
            })
    }

}
module.exports = new moviesController()