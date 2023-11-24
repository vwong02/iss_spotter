/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');

const fetchMyIP = function(callback) {

  const url = 'https://api.ipify.org?format=json';

  // use request to fetch IP address from JSON API
  request(url, (error, response, body) => {
    const data = JSON.parse(body);
    const IP = data.ip;

    // inside the request callback ...
    // error can be set if invalid domain, user is offline, etc.
    if (error) {
      callback(error, null);
      return;
    }

    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${ response.statusCode } when fetching IP. Response: ${ body }`;
      callback(Error(msg), null);
      return;
    }

    // if we get here, all's well and we got the data
    callback(null, IP);

  });
};

const fetchCoordsByIP = function(IP, callback) {

  const url = `http://ipwho.is/${ IP }`;

  request(url, (error, response, body) => {
    // parse the returned body so we can check its information
    const data = JSON.parse(body);
    const coordinates = { latitude: data.latitude, longitude: data.longitude };

    // inside the request callback ...
    // error can be set if invalid domain, user is offline, etc.
    if (error) {
      callback(error, null);
      return;
    }

    // check if "success" is true or not
    if (!data.success) {
      const message = `Success status was ${ data.success }. Server message says: ${ data.message } when fetching for IP ${ data.ip }`;
      callback(Error(message), null);
      return;
    }

    // if we get here, all's well and we got the data
    callback(null, coordinates);

  });
};


/**
* Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
* Input:
*   - An object with keys `latitude` and `longitude`
*   - A callback (to pass back an error or the array of resulting data)
* Returns (via Callback):
*   - An error, if any (nullable)
*   - The fly over times as an array of objects (null if error). Example:
*     [ { risetime: 134564234, duration: 600 }, ... ]
*/

const fetchISSFlyOverTimes = function(coordinates, callback) {

  const url = `https://iss-flyover.herokuapp.com/json/?lat=${ coordinates.latitude }&lon=${ coordinates.longitude }`;

  request(url, (error, response, body) => {
    const data = JSON.parse(body);
    const flyOverTimes = data.response;

    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${ response.statusCode } when fetching ISS flyover times. Response: ${ body }`;
      callback(Error(msg), null);
      return;

    }

    callback(null, flyOverTimes);
  });
};

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */
const nextISSTimesForMyLocation = function(callback) {
  // empty for now
  fetchMyIP((error, IP) => {
    if (error) {
      callback(error, null);
      return;
    }

    fetchCoordsByIP(IP, (error, location) => {
      if (error) {
        callback(error, null);
        return;
      }

      fetchISSFlyOverTimes(location, (error, nextTimes) => {
        if (error) {
          callback(error, null);
          return;
        }
        callback(null, nextTimes);
      });
    });
  });
};



module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};