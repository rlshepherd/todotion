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

app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
})