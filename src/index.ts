require('dotenv').config();

import express from 'express';
import getDatabaseList from './notionDatabase'
import getPages, { Page } from './notionPage';
import getTodoChildrenFromBlockId from './notionTodo';


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
    (async () => {
        const databaseList = await getDatabaseList();
        const pageList = await Promise.all(
            databaseList.flatMap(database => getPages(database))
        );
        res.send(pageList.flat());
    })();
})

// List all todos
app.get('/todos', (req, res) => {
    (async () => {
        const databaseList = await getDatabaseList();
        const pageList = await Promise.all(
            databaseList.flat().flatMap(database => getPages(database))
        );
        const todoList = await Promise.all(
            pageList.flat().flatMap(page => getTodoChildrenFromBlockId(page['id']))
        );
        res.send(todoList.flat());
    })();
})

app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
})