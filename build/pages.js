"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const notionDatabase_1 = __importDefault(require("./notion/notionDatabase"));
const notionPage_1 = __importDefault(require("./notion/notionPage"));
// Get a list of all pages from all authorized databases.
// Do not get pages from the "Todotion" database, because we do not want
// circular importing of TODOs. 
const getUserPages = async () => {
    const databaseList = await notionDatabase_1.default()
        .then(x => x.flat())
        .then(x => x.filter((db) => db.title.toLowerCase() != 'todotion'));
    const pageList = await Promise.all(databaseList.flatMap(database => notionPage_1.default(database)))
        .then(x => x.flat());
    return pageList;
};
exports.default = getUserPages;
