import dotenv from 'dotenv';
import express from 'express';
import { sequelize } from './config/db.js';

dotenv.config();

const app = express(); 

async function main() {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(process.env.PORT, () => {
            console.log(`App escuchando en el puerto: ${process.env.PORT}`);
        });
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
}

main();
