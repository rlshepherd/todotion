const { Client } = require('@notionhq/client');

require('dotenv').config();

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

interface Database {
  title: string
  id: string
}

const databaseReducer = (acc: Database[], database: {title: {plain_text: string}[], id: String}) => {
    return [...acc, {title: database['title'][0]['plain_text'], id: database['id']}]
}

const getDatabaseList = () => {
  let databasesResponse = async () => {
      const response = await notion.databases.list(); 
      return response; 
  }
  const databaseList = databasesResponse().then(
      (value) =>  value['results'].reduce(databaseReducer, [])
  );
  return databaseList;
}

export { getDatabaseList as default };
