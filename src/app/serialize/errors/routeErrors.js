const serializeErrors = ({ description, output }) => ({
  description,
  name: output
});

module.exports = { serializeErrors };
