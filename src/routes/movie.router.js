import { Router } from 'express';
import { getMovies, postMovie, deleteMovie } from '../controllers/movieController.js';
import { movieCreateValidation } from '../middlewares/validation.js';

const router = Router();

router.get('', getMovies);
router.post('', movieCreateValidation, postMovie);
router.delete('/:id', deleteMovie);

export default router;
