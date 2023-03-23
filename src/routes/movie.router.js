import { Router } from 'express';
import { getMovies, postMovie, deleteMovie } from '../controllers/movieController.js';
import { movieCreateValidation, idValidation } from '../middlewares/validation.js';

const router = Router();

router.get('', getMovies);
router.post('', movieCreateValidation, postMovie);
router.delete('/:id', idValidation, deleteMovie);

export default router;
