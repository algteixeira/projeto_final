const serialize = ({message, path, type, context}) => {
    const adjustedPath = path.values();
    return {
        description: adjustedPath.next().value,
        name: message
    };
}

const serializeErrors = ({_original, details}) => {
    return {
        errors: details.map(serialize)
    }
};
module.exports = {serialize, serializeErrors};