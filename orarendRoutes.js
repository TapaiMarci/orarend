import express from 'express';
import * as orarendControls from '../controllers/orarendControllers.js';

const router = express.Router();

router.get('/tantargy', orarendControls.getAllTantargy);
router.post('/tantargy', orarendControls.createTantargy);
router.put('/tantargy/:id', orarendControls.updateTantargy);
router.delete('/tantargy/:id', orarendControls.deleteTantargy);

export default router;