import notion from './notionClient';

export interface Block {
    id: string
}

export interface Todo extends Block {
    checked: boolean
    text: string
}

const getTodos = (blockid: string) => { 
    const blockResponse = async (blockid: string) => {
        return await notion.blocks.children.list({
            block_id: blockid,
            page_size: 50,
        }); 
    }
    const todoList: Promise<Todo[]> = blockResponse(blockid).then(
        (value) => value['results'].filter((block: {type: string}) => block['type'] === 'to_do')
    )
    return todoList;
}

export {getTodos as default};