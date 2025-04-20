import express from 'express';

const app = express();
const PORT = 3000;

app.get('/', (_req, res) => {
    res.send('¡Servidor en TypeScript funcionando!');
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});