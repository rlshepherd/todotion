require('dotenv').config();

import express from 'express';
import getDatabaseList from './notionDatabase'
import getPages from './notionPage';
import getTodos from './notionTodo';


const app = express();

// List all authorized databases.
app.get('/', (req, res) => {
    (async () => {
        const databaseList = await getDatabaseList();
        res.send(databaseList);
    })();
})

// List all pages from all authorized databases. 
app.get('/pages', (req, res) => {
    getDatabaseList().then(
        (databaseList) => {
            Promise.all(
                databaseList.flatMap(database => getPages(database))
            ).then(
                (pageList) => res.send(pageList[0])
            )
        }
    )
})


app.get('/todos', (req, res) => {
    getDatabaseList().then(
        (databaseList) => {
            Promise.all(
                databaseList.flatMap(database => getPages(database))
            ).then(
                (pageList) => {
                    Promise.all(
                        pageList[0].flatMap(page => getTodos(page['id']))
                    ).then(
                        (value) => res.send(value)
                    )
                } 
            )
        }
    ) 
})

app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
})