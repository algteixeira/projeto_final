const Database = require('../../src/infra/database/mongo');

const cleanDatabase = async () => {
  const db = await Database;
  for (const collection of Object.keys(db.connection.collections)) {
    db.connection.collections[collection].deleteMany({});
  }
};

module.exports = cleanDatabase;
