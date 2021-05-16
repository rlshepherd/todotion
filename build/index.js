"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const notionDatabase_1 = __importDefault(require("./notionDatabase"));
const notionPage_1 = __importDefault(require("./notionPage"));
const notionTodo_1 = __importDefault(require("./notionTodo"));
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
        const databaseList = await notionDatabase_1.default().then(x => x.flat());
        const pageList = await Promise.all(databaseList.flatMap(database => notionPage_1.default(database))).then(x => x.flat());
        res.send(pageList);
    })();
});
// List all todos
app.get('/todos', (req, res) => {
    (async () => {
        const databaseList = await notionDatabase_1.default().then(x => x.flat());
        const pageList = await Promise.all(databaseList.flatMap(database => notionPage_1.default(database))).then(x => x.flat());
        const todoList = await Promise.all(pageList.flatMap(page => notionTodo_1.default(page['id']))).then(x => x.flat());
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
            res.send('Synced');
        }
    })();
});
app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
});
