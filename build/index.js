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
        const databaseList = await notionDatabase_1.default();
        res.send(databaseList);
    })();
});
// List all pages from all authorized databases. 
app.get('/pages', (req, res) => {
    notionDatabase_1.default().then((databaseList) => {
        Promise.all(databaseList.flatMap(database => notionPage_1.default(database))).then((pageList) => res.send(pageList[0]));
    });
});
app.get('/todos', (req, res) => {
    notionDatabase_1.default().then((databaseList) => {
        Promise.all(databaseList.flatMap(database => notionPage_1.default(database))).then((pageList) => {
            Promise.all(pageList[0].flatMap(page => notionTodo_1.default(page['id']))).then((value) => res.send(value));
        });
    });
});
app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
});
