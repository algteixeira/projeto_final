const idRegex = () => {
  const idRegexp = /[0-9a-fA-F]{24}/;
  return idRegexp;
};

const plateRegex = () => {
  const plateRegexp = /[A-Z]{3}[0-9]{4}/;
  return plateRegexp;
};

const cpfRegex = () => {
  const cpfRegexp = /[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}/;
  return cpfRegexp;
};

const cnpjRegex = () => {
  const cnpjRegexp = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;
  return cnpjRegexp;
};

const cepRegex = () => {
  const cepRegexp = /[0-9]{5}-[0-9]{3}$/;
  return cepRegexp;
};

module.exports = { idRegex, cpfRegex, cnpjRegex, cepRegex, plateRegex };
