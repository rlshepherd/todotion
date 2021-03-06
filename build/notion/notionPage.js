"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const notionClient_1 = __importDefault(require("./notionClient"));
const pageReducer = (acc, page) => {
    let name;
    if (page['properties']['Name']['title'].length > 0) {
        name = page['properties']['Name']['title'][0]['plain_text'];
    }
    else {
        name = "Untitled";
    }
    return [...acc, { id: page['id'], name: name }];
};
const getPages = async (database) => {
    const pagesResponse = await notionClient_1.default.databases.query({
        database_id: database['id'],
    });
    return pagesResponse['results'].reduce(pageReducer, []);
};
exports.default = getPages;
