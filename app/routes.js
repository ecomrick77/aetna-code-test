module.exports = function(app){
    const moviesController = require('./controllers/moviesController')
    app.get('/movies', moviesController.getMovies)
    app.get('/movies/genre', moviesController.getMovies)
    app.get('/movies/year', moviesController.getMovies)
    app.get('/movie/:imdbId', moviesController.getMovieDetails)
}