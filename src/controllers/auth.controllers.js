import { config } from 'dotenv'
import {db} from "../config/firebase.js"
import jwt from 'jsonwebtoken';

config()

const SECRET_KEY = process.env.SECRET_KEY

export const loginUser = async (req, res) => {
    const { nombre, email,apellidos } = req.body;

    try {
        const userSnapshot = await db.collection('usuarios')
            .where('nombre', '==', nombre)
            .where('email', '==', email)
            .where('apellidos','==',apellidos)
            .get();

        if (userSnapshot.empty) {
            return res.status(401).json({ message: 'Invalid name or email' });
        }

        const user = userSnapshot.docs[0].data();
        const token = jwt.sign(
            {
                id: user.id,
                nombre: user.nombre,
                email: user.email,
                rol: user.rol
            },
            SECRET_KEY,
            { expiresIn: '168h' }
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};