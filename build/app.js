"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const notionDatabase_1 = __importDefault(require("./notion/notionDatabase"));
const pages_1 = __importDefault(require("./pages"));
const todos_1 = __importDefault(require("./todos"));
const app = express_1.default();
// List all authorized databases.
app.get('/', (req, res) => {
    (async () => {
        const databaseList = await notionDatabase_1.default().then(x => x.flat());
        res.send(databaseList);
    })();
});
// List all pages from all authorized databases. 
app.get('/pages', (req, res) => {
    (async () => {
        const pageList = await pages_1.default();
        res.send(pageList);
    })();
    // (async () => {
    //     const databaseList = await getDatabaseList().then(x => x.flat());
    //     const pageList = await Promise.all(
    //         databaseList.flatMap(database => getPages(database))
    //     ).then(x => x.flat());
    //     res.send(pageList);
    // })();
});
// List all todos
app.get('/todos', (req, res) => {
    (async () => {
        const todoList = await todos_1.default();
        res.send(todoList);
    })();
});
app.get('/sync', (req, res) => {
    (async () => {
        const databaseList = await notionDatabase_1.default().then(x => x.flat());
        if (!databaseList.map(db => db.title.toLowerCase()).includes('todotion')) {
            res.send('No authorized todotion database found, pleaes add a database called "Todotion" and authorize this integration to use it.');
        }
        else {
            const todoList = await todos_1.default();
            // TODO add blocks as children to new page.
            res.send('Synced');
        }
    })();
});
app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
});
