const moment = require('moment');

class DateOps {
  // original = MM/DD/YYYY
  async toBrazilianTime(date) {
    return moment(date, 'MM/DD/YYYY').format('DD/MM/YYYY');
  }
}

module.exports = new DateOps();
