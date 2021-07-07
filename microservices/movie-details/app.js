require('dotenv').config();
const express = require('express')
    , http = require('http')
    , app = express();

// start server
const server = http.Server(app)

// routes
app.get('/:imdbId', function(req, res){
    const imdbId = req.params.imdbId !== undefined ? req.params.imdbId : null
    const sqlite3 = require('sqlite3').verbose();
    const moviesDB = new sqlite3.Database('./db/movies.db');
    const ratingsDB = new sqlite3.Database('./db/ratings.db');

    moviesDB.get(`select movieId, imdbId, title, overview as description, releaseDate, budget, runtime, genres, language, productionCompanies 
        from movies where imdbId='${imdbId}'`, [], (err, mov) => {
        if(err){
            res.writeHead(500, {'Content-Type': 'application/json'});
            return res.end(JSON.stringify({imdbId: imdbId, error: err}));
        }
        ratingsDB.get(`select avg(rating) as average_rating from ratings where movieId='${mov.movieId}'`, [], (err, rat) => {
            if (err) {
                res.writeHead(500, {'Content-Type': 'application/json'});
                return res.end(JSON.stringify({imdbId: imdbId, error: err}));
            }

            delete mov.movieId
            mov.genres = JSON.parse(mov.genres)
            mov.productionCompanies = JSON.parse(mov.productionCompanies)
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(Object.assign(mov,rat)));
        })
    })

})

// 404 errors
app.use(function (req,res,next){
    res.status(404).send('Error 404: File Not Found');
});

// listen to port
server.listen(process.env.PORT, () => {
    console.log(`App running on port ${process.env.PORT}`)
})