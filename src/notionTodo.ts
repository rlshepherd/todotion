import notion from './notionClient';

export interface Block {
    id: string
}

export interface Todo extends Block {
    checked: boolean
    text: string
}

const getTodoChildrenFromBlockId = async (blockid: string) => { 
    const blockResponse = await notion.blocks.children.list({
        block_id: blockid,
        page_size: 50,
    }); 
    return blockResponse['results'].filter((block: {type: string}) => block['type'] === 'to_do') as Promise<Todo[]>;
}

export {getTodoChildrenFromBlockId as default};