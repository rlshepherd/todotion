import notion from './notionClient';
import { Database } from './notionDatabase'

export interface Page {
    id: string
    name: string
}

const pageReducer = (acc: Page[], page: {id: string, properties: {Name: {title: {plain_text: string}[]}}}) => {
    return [...acc, {id: page['id'], name: page['properties']['Name']['title'][0]['plain_text']}]
}

const getPages = async (database: Database) => {
    const pagesResponse = await notion.databases.query({
        database_id: database['id'],
    });
    return pagesResponse['results'].reduce(pageReducer, []).flat() as Promise<Page[]>;
}

export {getPages as default};