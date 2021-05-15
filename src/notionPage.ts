import notion from './notionClient';
import { Database } from './notionDatabase'

export interface Page {
    id: string
    name: string
}

const pageReducer = (acc: Page[], page: {id: string, properties: {Name: {title: {plain_text: string}[]}}}) => {
    return [...acc, {id: page['id'], name: page['properties']['Name']['title'][0]['plain_text']}]
}

const getPages = (database: Database) => {
    const pagesResponse = async (database: Database) => {
        return await notion.databases.query({
            database_id: database['id'],
        });
    }
    const pageList: Promise<Page[]> = pagesResponse(database).then(
        (value) => value['results'].reduce(pageReducer, [])
    )
    return pageList;
}

export {getPages as default};