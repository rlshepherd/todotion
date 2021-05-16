"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const { Client } = require('@notionhq/client');
// Initializing a client
const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});
exports.default = notion;
