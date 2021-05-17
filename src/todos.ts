import recursiveGetChildrenFromBlockId, { Block } from "./notion/notionBlock";
import getChildrenFromBlockId from "./notion/notionBlock";
import getUserPages from "./pages";

const getAllTodos = async () => {
    const pageList = await getUserPages();
    
    const todoList = await Promise.all(
        pageList.flatMap(page => recursiveGetChildrenFromBlockId(page['id']))
    )
    .then(x => x.flat())
    .then(x => x.filter(block => block['type'] === 'to_do'))

    return todoList;
}

export {getAllTodos as default};