const serialize = ({ message, path }) => {
  const adjustedPath = path.values();
  return {
    description: adjustedPath.next().value,
    name: message
  };
};

const serializeErrors = ({ details }) => ({
  errors: details.map(serialize)
});
module.exports = { serialize, serializeErrors };
/* , type, context */
// _original
