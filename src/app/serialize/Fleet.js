const { serializeCreateFleet } = require('./createFleet');

const serializeFleet = ({ docs, limit, totalDocs, pagingCounter, totalPages }) => ({
  frota: docs.map(serializeCreateFleet),
  total: totalDocs,
  limit,
  offset: pagingCounter,
  offsets: totalPages
});

module.exports = { serializeFleet };
