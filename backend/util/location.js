const axios = require("axios");

const HttpError = require("../models/http-error");

const API_KEY = process.env.GOOGLE_API_KEY;

async function getCoordsForAddress(address) {
  const response = await axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      address
    )}.json?access_token=${API_KEY}`
  );
  const data = response.data;

  if (!data) {
    new HttpError("Could not find location for the specified address.", 422);
  }

  const coordinates = {
    lat: data.features[0].geometry.coordinates[0],
    lng: data.features[0].geometry.coordinates[1],
  };
  return coordinates;
}

module.exports = getCoordsForAddress;
