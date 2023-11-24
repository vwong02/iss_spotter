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

const { fetchISSFlyOverTimes } = require('./iss');

fetchISSFlyOverTimes({ latitude: 43.653226, longitude: -79.3831843 }, (error, flyOverTimes) => {
  if (error) {
    console.log("It didn't work", error);
    return;
  }

  console.log("It worked! Returned ISS fly over times:", flyOverTimes);

});