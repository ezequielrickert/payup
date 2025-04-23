import {Router} from "express";

export const userRoutes = Router();

userRoutes.get('/', (_req, res) => {
    res.send('¡Ruta de usuarios!');
});