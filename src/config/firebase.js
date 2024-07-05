import path from 'path'
import {config} from 'dotenv'

import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';


// Variables de entorno
config()
process.env.GOOGLE_APPLICATION_CREDENTIALS = path.resolve(process.env.GOOGLE_APPLICATION_CREDENTIALS);

// Firebase
admin.initializeApp({
    credential : admin.credential.cert(process.env.GOOGLE_APPLICATION_CREDENTIALS),
    databaseURL: process.env.DATABASE_URL
})

// Base de datos
const database = admin.database()
const db = getFirestore();


if (database) {
    console.log('Db is connected to firebase')
}

export default db;