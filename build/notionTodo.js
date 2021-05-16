"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const notionClient_1 = __importDefault(require("./notionClient"));
const getTodoChildrenFromBlockId = async (blockid) => {
    const blockResponse = await notionClient_1.default.blocks.children.list({
        block_id: blockid,
        page_size: 50,
    });
    return blockResponse['results'].filter((block) => block['type'] === 'to_do');
};
exports.default = getTodoChildrenFromBlockId;
