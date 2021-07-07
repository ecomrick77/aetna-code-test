require('dotenv').config();
const express = require('express')
    , http = require('http')
    , app = express();

// start server
const server = http.Server(app)

// routes
app.get('/', function(req, res){

    const sqlite3 = require('sqlite3').verbose();
    const moviesDB = new sqlite3.Database('./db/movies.db');

    const page = req.query.page !== undefined ? parseInt(req.query.page) : 0
    const offset = page * 50
    let sortBy = ''
    if(req.query.sort !== undefined && req.query.sort.length > 0 ){
        if(req.query.sort === 'genre'){
            sortBy='order by `genre`'
        } else if(req.query.sort === 'year'){
            sortBy='order by releaseDate desc'
        }
    }

    moviesDB.all(`select imdbId, title, genres, releaseDate, budget, json_extract(genres, '$[0].name') AS \`genre\` 
        from movies ${sortBy} limit ${offset},50`, [], (err, rows) => {
        if(err){
            res.writeHead(500, {'Content-Type': 'application/json'});
            return res.end(JSON.stringify({error: err}));
        }

        rows.forEach(obj => obj.genres=JSON.parse(obj.genres))
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(rows));
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