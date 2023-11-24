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


module.exports = { fetchMyIP, fetchCoordsByIP };