import getDatabaseList, { Database } from "./notion/notionDatabase";
import getPages from "./notion/notionPage";

// Get a list of all pages from all authorized databases.
// Do not get pages from the "Todotion" database, because we do not want
// circular importing of TODOs. 
const getUserPages = async () => {
    const databaseList = await getDatabaseList()
    .then(x => x.flat())
    .then(x => x.filter((db: Database) => db.title.toLowerCase() != 'todotion'));

    const pageList = await Promise.all(
        databaseList.flatMap(database => getPages(database))
    )
    .then(x => x.flat())

    return pageList;
}

export {getUserPages as default};