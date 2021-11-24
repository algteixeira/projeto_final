const setupDb = require('./support/cleanDatabase');

global.afterEach(async () => await setupDb());
