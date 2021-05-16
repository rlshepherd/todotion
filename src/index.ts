require('dotenv').config();

import express from 'express';
import getDatabaseList from './notionDatabase'
import getPages, { Page } from './notionPage';
import getTodoChildrenFromBlockId from './notionTodo';


const app = express();

// List all authorized databases.
app.get('/', (req, res) => {
    (async () => {
        const databaseList = await getDatabaseList().then(x => x.flat());
        res.send(databaseList);
    })();
})

// List all pages from all authorized databases. 
app.get('/pages', (req, res) => {
    (async () => {
        const databaseList = await getDatabaseList().then(x => x.flat());
        const pageList = await Promise.all(
            databaseList.flatMap(database => getPages(database))
        ).then(x => x.flat());
        res.send(pageList);
    })();
})

// List all todos
app.get('/todos', (req, res) => {
    (async () => {
        const databaseList = await getDatabaseList().then(x => x.flat());
        const pageList = await Promise.all(
            databaseList.flatMap(database => getPages(database))
        ).then(x => x.flat());
        const todoList = await Promise.all(
            pageList.flatMap(page => getTodoChildrenFromBlockId(page['id']))
        ).then(x => x.flat());
        res.send(todoList);
    })();
})

app.get('/sync', (req, res) => {
    (async () => {
        const databaseList = await getDatabaseList().then(x => x.flat());
        if (!databaseList.map(db => db.title.toLowerCase()).includes('todotion')) {
            res.send('No authorized todotion database found, pleaes add a database called "Todotion" and authorize this integration to use it.');
        } else {
            res.send('Synced');
        }
    })();
})

app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
})