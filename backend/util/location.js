const axios = require("axios");

const HttpError = require("../models/http-error");

const API_KEY =
  "pk.eyJ1Ijoia21qc2QiLCJhIjoiY2s1NThnamh6MDNvYTNubjFxcmZyY2o0YSJ9.VJV0sR7vnSaaEhDIJ1KhjA";

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
