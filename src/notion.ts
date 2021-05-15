const { Client } = require('@notionhq/client');

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

function retrieveDatabases() {
  return (async () => {
    const response = await notion.databases.list();
    console.log(response);
  })();
}

// function getPages() {
//   // retrieve all pages 
// }

// function getBlocks() {
//   // retrieve all blocks in a given page. 

// }

export default retrieveDatabases; 