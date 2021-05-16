"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.getTodos = void 0;
const notionBlock_1 = __importDefault(require("./notion/notionBlock"));
const notionBlock_2 = __importDefault(require("./notion/notionBlock"));
const pages_1 = __importDefault(require("./pages"));
const getTodos = async () => {
    const pageList = await pages_1.default();
    const todoList = await Promise.all(pageList.flatMap(page => notionBlock_2.default(page['id'])))
        .then(x => x.flat())
        .then(x => x.filter(block => block['type'] === 'to_do'));
    return todoList;
};
exports.getTodos = getTodos;
const getAllTodos = async () => {
    const pageList = await pages_1.default();
    const todoList = await Promise.all(pageList.flatMap(page => notionBlock_1.default(page['id'])))
        .then(x => x.flat())
        .then(x => x.filter(block => block['type'] === 'to_do'));
    return todoList;
};
exports.default = getAllTodos;
