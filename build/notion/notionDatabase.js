"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const notionClient_1 = __importDefault(require("./notionClient"));
const databaseReducer = (acc, database) => {
    return [...acc, { title: database['title'][0]['plain_text'], id: database['id'] }];
};
const getDatabaseList = async () => {
    const databasesResponse = await notionClient_1.default.databases.list();
    return databasesResponse['results'].reduce(databaseReducer, []);
};
exports.default = getDatabaseList;
