import express, {json} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import categoriesRouter from './routers/categoriesRouter';
import gamesRouter from './routers/gamesRouter';
import customersRouter from './routers/customersRouter';
import rentalsRouter from './routers/rentalsRouter';

const app = express();
app.use(cors());
app.use(json());
dotenv.config();

app.use(categoriesRouter);
app.use(gamesRouter);
app.use(customersRouter);
app.use(rentalsRouter);

app.listen(4000, () => console.log('Servidor Conectado!'));
