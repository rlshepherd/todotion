import getChildrenFromBlockId from "./notion/notionTodo";
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

export {getTodos as default};