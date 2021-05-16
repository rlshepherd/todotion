"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const notionTodo_1 = __importDefault(require("./notion/notionTodo"));
const pages_1 = __importDefault(require("./pages"));
function getTodos() {
    return (async () => {
        const pageList = await pages_1.default();
        // const pageList = await Promise.all(
        //     databaseList
        //     .filter((db: Database) => db.title.toLowerCase() != 'todotion')
        //     .flatMap(database => getPages(database))
        // )
        // .then(x => x.flat());
        const todoList = await Promise.all(pageList.flatMap(page => notionTodo_1.default(page['id'])))
            .then(x => x.flat())
            .then(x => x.filter(block => block['type'] === 'to_do'));
        return todoList;
    })();
}
exports.default = getTodos;
