const schedule = require("node-schedule");
const moment = require("moment");
const start = require("./cnbeta_task");

const timer = () => {
  schedule.scheduleJob("50 */2 * * * *", function(fireDate) {
    console.log(`\nTime:${moment(fireDate).format("YY-MM-DD HH:mm:ss")}`);
    start();
  });
};

module.exports = timer;
