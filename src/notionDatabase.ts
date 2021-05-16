import notion from "./notionClient";

export interface Database {
  title: string
  id: string
}

const databaseReducer = (acc: Database[], database: {title: {plain_text: string}[], id: String}) => {
    return [...acc, {title: database['title'][0]['plain_text'], id: database['id']}]
}

const getDatabaseList = async () => {
  const databasesResponse = await notion.databases.list();
  return databasesResponse['results'].reduce(databaseReducer, []) as Promise<Database[]>;
}

export { getDatabaseList as default };
