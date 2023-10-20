const Movie = require('../models/movie');
const Performer = require('../models/performer');

module.exports = {
  index,
  show,
  new: newMovie,
  create
};

async function index(req, res) {
  const movies = await Movie.find({});
  res.render('movies/index', { title: 'All Movies', movies });
}

async function show(req, res) {
  const movie = await Movie.findById(req.params.id).populate('cast');
  const performers = await Performer.find({ _id: { $nin: movie.cast } }).sort('name');
  res.render('movies/show', { title: 'Movie Detail', movie, performers });
}

function newMovie(req, res) {
  res.render('movies/new', { title: 'Add Movie', errorMsg: '' });
}

async function create(req, res) {
  req.body.nowShowing = !!req.body.nowShowing;
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  try {
    const movie = await Movie.create(req.body);
    res.redirect(`/movies/${movie._id}`);
  } catch (err) {
    console.log(err);
    res.render('movies/new', { errorMsg: err.message });
  }
}