import { Router } from 'express';
import { movieByTitle, movies } from '../controllers/movie.controller';
import { producersByInterval } from '../controllers/producer.controller';

const router: Router = Router();

// basic methods for movies
router.get('/movies/', movies);
router.get('/movies/:title', movieByTitle);

// Producers by interval
router.get('/producers', producersByInterval);

// 404 routes
router.get('*', function (req, res) {
  res.status(404).send({ error: 'Route not found' });;
});

export default router;