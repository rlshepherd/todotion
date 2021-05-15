"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const notionClient_1 = __importDefault(require("./notionClient"));
const pageReducer = (acc, page) => {
    return [...acc, { id: page['id'], name: page['properties']['Name']['title'][0]['plain_text'] }];
};
const getPages = (database) => {
    const pagesResponse = async (database) => {
        return await notionClient_1.default.databases.query({
            database_id: database['id'],
        });
    };
    const pageList = pagesResponse(database).then((value) => value['results'].reduce(pageReducer, []));
    return pageList;
};
exports.default = getPages;
