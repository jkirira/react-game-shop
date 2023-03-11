import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import v1ApiRouter from './api/v1/routes/index.js';

dotenv.config();

const port = process.env.PORT || 5000;

const APP_ENV = process.env.APP_ENV;


const app = express();

app.use(cors());
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/test', async (req, res) => {
    // function to test server response here
    return res.status(204).json({});
})


app.use('/api/v1', v1ApiRouter);


app.all('*', (req, res, next) => {
    console.log('404');
    /*
    *
    * TODO: create 404 page
    * 
    * res.sendFile(path.resolve(__dirname) + '/index.html');
    * 
    */
    res.status(404).json({type: "error", message: 'Unknown path'});
})


if(APP_ENV === 'local') {
    app.listen(port, () => {console.log(`server running at port ${port}`)});
}
