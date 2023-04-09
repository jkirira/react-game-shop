import express from 'express';
import { getAllGames, addGame, getGame, editGame, deleteGame } from '../../controllers/admin/gamesController.js';

const router = express.Router();

router.get('/', getAllGames);

router.post('/', addGame);

router.get('/:game_id', getGame);

router.put('/:game_id', editGame);

router.delete('/:game_id', deleteGame);

export default router;
