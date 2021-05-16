"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.getChildrenFromBlockId = void 0;
const notionClient_1 = __importDefault(require("./notionClient"));
const getChildrenFromBlockId = async (blockid) => {
    const blockResponse = await notionClient_1.default.blocks.children.list({
        block_id: blockid,
        page_size: 50,
    });
    return blockResponse['results'];
};
exports.getChildrenFromBlockId = getChildrenFromBlockId;
const recursiveGetChildrenFromBlockId = async (blockid) => {
    const children = await getChildrenFromBlockId(blockid).then(x => x.flat());
    const grandChildren = await Promise.all(children
        .filter(child => child.has_children)
        .flatMap(hasChild => recursiveGetChildrenFromBlockId(hasChild.id)))
        .then(x => x.flat());
    return [...children, ...grandChildren];
};
exports.default = recursiveGetChildrenFromBlockId;
