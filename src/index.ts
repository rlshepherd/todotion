import express from 'express';
import getDatabaseList from './notionDatabase'

const app = express();

app.get('/', (req, res) => {
    (async () => {
        const databaseList = await getDatabaseList();
        res.send(databaseList);
      })()
})

app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
})