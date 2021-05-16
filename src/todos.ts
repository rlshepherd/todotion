import recursiveGetChildrenFromBlockId, { Block } from "./notion/notionBlock";
import getChildrenFromBlockId from "./notion/notionBlock";
import getUserPages from "./pages";

const getTodos = async () => {
    const pageList = await getUserPages();
    
    const todoList = await Promise.all(
        pageList.flatMap(page => getChildrenFromBlockId(page['id']))
    )
    .then(x => x.flat())
    .then(x => x.filter(block => block['type'] === 'to_do'))

    return todoList;
}

const getAllTodos = async () => {
    const pageList = await getUserPages();
    
    const todoList = await Promise.all(
        pageList.flatMap(page => recursiveGetChildrenFromBlockId(page['id']))
    )
    .then(x => x.flat())
    .then(x => x.filter(block => block['type'] === 'to_do'))

    return todoList;
}

export {getTodos, getAllTodos as default};