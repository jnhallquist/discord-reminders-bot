const chrono = require('chrono-node');
const moment = require('moment-timezone');

module.exports = (input, timezone) => {
  const timeInZone = moment(new Date()).tz(timezone);
  // TODO: This currently throws a moment error. Fix it?
  const zone       = timeInZone.zoneAbbr();
  const ref        = timeInZone.format();
  const parsedDate = chrono.parseDate(`${input} ${zone}`, ref);
  const delayAmt   = parsedDate.getTime() - timeInZone.valueOf();

  return {
    delayAmt,
    input,
    parsed: moment(parsedDate).tz(timezone).format('M/D/YYYY h:mm a'),
    timeInMS: Date.parse(
      moment(parsedDate).tz(timezone).format('M/D/YYYY h:mm a')
    ),
    offset: timeInZone.format('Z')
  };
};
