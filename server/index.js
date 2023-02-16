import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const port = process.env.PORT || 5000;

const APP_ENV = process.env.APP_ENV;


const app = express();

app.use(cors());

app.get('/api', (req, res) => {

})

app.get('/*', (req, res) => {
    // res.sendFile(path.resolve(__dirname) + '/index.html');
    res.json({message: 'Unknown path'}, 404);
})


if(APP_ENV === 'local') {
    app.listen(port, () => {console.log(`server running at port ${port}`)});
}
