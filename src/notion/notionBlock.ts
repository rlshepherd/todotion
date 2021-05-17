import notion from './notionClient';

export interface Block {
    id: string
    type: string
    has_children: boolean
}

const getChildrenFromBlockId = async (blockid: string) => { 
    const blockResponse = await notion.blocks.children.list({
        block_id: blockid,
        page_size: 50,
    }); 
    // TODO implement pagination.
    return blockResponse['results'] as Promise<Block[]>;
}

const recursiveGetChildrenFromBlockId = async (blockid: string) => {
    // TODO add a depth limit option to this function. 
    const children = await getChildrenFromBlockId(blockid).then(x => x.flat())
    const grandChildren: Block[] = await Promise.all(
        children
        .filter(child => child.has_children)
        .flatMap(hasChildren => recursiveGetChildrenFromBlockId(hasChildren.id))
    )
    .then(x => x.flat());
    return [...children,...grandChildren]
}

export {getChildrenFromBlockId, recursiveGetChildrenFromBlockId as default};