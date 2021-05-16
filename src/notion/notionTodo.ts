import notion from './notionClient';

export interface Block {
    id: string
    type: string
}

const getChildrenFromBlockId = async (blockid: string) => { 
    const blockResponse = await notion.blocks.children.list({
        block_id: blockid,
        page_size: 50,
    }); 
    return blockResponse['results'] as Promise<Block[]>;
}

export {getChildrenFromBlockId as default};