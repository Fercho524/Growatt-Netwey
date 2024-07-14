import {config} from 'dotenv'
config()

import express from 'express';
import morgan from 'morgan';

// Routes
import authRoutes from './routes/auth.routes.js'
import dataloggersRoutes from './routes/dataloggers.routes.js'
import indexRoutes from './routes/index.routes.js'
import inverterRoutes from './routes/inverters.routes.js'
import plantRoutes from './routes/plants.routes.js'
import threesholdRoutes from './routes/threshold.routes.js'


// Config
const app = express();


// Middlewares
app.use(morgan('dev'))
app.use(express.json())


// Routes
app.use('/api',indexRoutes)
app.use('/api/auth',authRoutes)
app.use('/api/config',threesholdRoutes)
app.use('/api/plants', plantRoutes)
app.use('/api/dataloggers',dataloggersRoutes)
app.use('/api/device/inverters',inverterRoutes)


export default app;