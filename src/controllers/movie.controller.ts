import { Request, Response } from 'express';
import { getMovie, getMovies } from '../services/movie.service';

// route to get all movies
export const movies = async (req: Request, res: Response) => {
  try {
    res.status(200).json(await getMovies());
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve movies' });
  }
};

// route to get movie information by title
export const movieByTitle = async (req: Request, res: Response) => {
  try {
    const movie = await getMovie(req.params.title)
    if (!movie) {
      res.status(404).send({ error: 'Movie not found' });
    } else {
      res.status(200).json(movie);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve movie' });
  }
};
