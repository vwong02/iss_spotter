const { nextISSTimesForMyLocation } = require('./iss_promised');
const { printTimes } = require('./index');

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });