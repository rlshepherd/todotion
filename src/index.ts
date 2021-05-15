import express from 'express';
import retrieveDatabases from './notion';

const app = express();

app.get('/', (req, res) => {
    res.send('Well done!');
    retrieveDatabases();
})

app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
})