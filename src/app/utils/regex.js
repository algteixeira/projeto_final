const idRegex = () => {
  const idRegexp = /[0-9a-fA-F]{24}/;
  return idRegexp;
};

const cpfRegex = () => {
  const cpfRegexp = /[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}/;
  return cpfRegexp;
};

module.exports = { idRegex, cpfRegex };
