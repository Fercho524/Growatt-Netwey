import { config } from 'dotenv'
config()

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

// Routes
import authRoutes from './routes/auth.routes.js'
import dataloggersRoutes from './routes/dataloggers.routes.js'
import indexRoutes from './routes/index.routes.js'
import deviceRoutes from './routes/device.routes.js'
import plantRoutes from './routes/plants.routes.js'
import threesholdRoutes from './routes/threshold.routes.js'


// Config
const app = express();

// Cors Policy
const corsOptions = {
    origin: process.env.NETWEY_FRONT_HOST,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

// Middlewares
app.use(morgan('dev'))
app.use(express.json())


// Routes
app.use('/api', indexRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/config', threesholdRoutes)
app.use('/api/plants', plantRoutes)
app.use('/api/dataloggers', dataloggersRoutes)
app.use('/api/devices', deviceRoutes)


export default app;