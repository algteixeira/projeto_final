const serializeFleet = ({ docs, limit, totalDocs, pagingCounter, totalPages }) => ({
  frota: docs,
  total: totalDocs,
  limit,
  offset: pagingCounter,
  offsets: totalPages
});

module.exports = { serializeFleet };
