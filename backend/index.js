import express from "express";
import { PORT, mongoDBURL } from "./config";
import mongoose from "mongoose";
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome');
})


mongoose.connect(mongoDBURL).then(() => {
    console.log('App connected to the database.');
    app.listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}`)
    });
}).catch((error) => {
    console.log(error);
})