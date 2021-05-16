"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const notionDatabase_1 = __importDefault(require("./notion/notionDatabase"));
const notionPage_1 = __importDefault(require("./notion/notionPage"));
const notionTodo_1 = __importDefault(require("./notion/notionTodo"));
function getTodos() {
    return (async () => {
        const databaseList = await notionDatabase_1.default().then(x => x.flat());
        const pageList = await Promise.all(databaseList.flatMap(database => notionPage_1.default(database))).then(x => x.flat());
        const todoList = await Promise.all(pageList.flatMap(page => notionTodo_1.default(page['id']))).then(x => x.flat());
        return todoList;
    })();
}
exports.default = getTodos;
