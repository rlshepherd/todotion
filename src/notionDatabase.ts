import notion from "./notionClient";

export interface Database {
  title: string
  id: string
}

const databaseReducer = (acc: Database[], database: {title: {plain_text: string}[], id: String}) => {
    return [...acc, {title: database['title'][0]['plain_text'], id: database['id']}]
}

const getDatabaseList = () => {
  const databasesResponse = async () => { return await notion.databases.list(); }
  const databaseList: Promise<Database[]> = databasesResponse().then(
      (value) =>  value['results'].reduce(databaseReducer, [])
  );
  return databaseList;
}

export { getDatabaseList as default };
