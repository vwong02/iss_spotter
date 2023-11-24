// const { fetchMyIP } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log('It worked! Returned IP:', ip);
// });

// const { fetchCoordsByIP } = require('./iss');

// fetchCoordsByIP('66.23.30.156', (error, data) => {
//   if (error) {
//     console.log("It didn't work", error);
//     return;
//   }

//   console.log("It worked! Returned coordinates:", data);

// });

// const { fetchISSFlyOverTimes } = require('./iss');

// fetchISSFlyOverTimes({ latitude: 43.653226, longitude: -79.3831843 }, (error, flyOverTimes) => {
//   if (error) {
//     console.log("It didn't work", error);
//     return;
//   }

//   console.log("It worked! Returned ISS fly over times:", flyOverTimes);

// });

const { nextISSTimesForMyLocation } = require('./iss');

const printTimes = function(passTimes) {
  for (const time of passTimes) {
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(time.risetime);
    const duration = time.duration;
    console.log(`Next pass at ${ dateTime } for ${ duration } seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printTimes(passTimes);
});

module.exports = { printTimes };