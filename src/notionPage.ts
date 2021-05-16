import notion from './notionClient';
import { Database } from './notionDatabase'

export interface Page {
    id: string
    name: string
}

const pageReducer = (acc: Page[], page: {id: string, properties: {Name: {title: {plain_text: string}[]}}}) => {
    let name;
    if (page['properties']['Name']['title'].length > 0) {
        name = page['properties']['Name']['title'][0]['plain_text']; 
    } else {
        name = "Untitled";  
    }
    return [...acc, {id: page['id'], name: name}]
}

const getPages = async (database: Database) => {
    const pagesResponse = await notion.databases.query({
        database_id: database['id'],
    });
    return pagesResponse['results'].reduce(pageReducer, []).flat() as Promise<Page[]>;
}

export {getPages as default};