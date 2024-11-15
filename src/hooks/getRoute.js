import axios from 'axios';

function formatCoordinates(coordinates) {
  let finalCoordinates = '';
  coordinates.forEach((coordinate) => {
    finalCoordinates +=
      coordinate.longitude.toString() + ',' + coordinate.latitude.toString() + ';';
  });
  if (finalCoordinates.charAt(finalCoordinates.length - 1) === ';') {
    return finalCoordinates.slice(0, -1);
  }
  return finalCoordinates;
}

// https://project-osrm.org/docs/v5.24.0/api/#
// https://github.com/Project-OSRM/osrm-backend/blob/master/docs/http.md
export const getRoute = async (coordinates) => {
  const finalCoordinates = formatCoordinates(coordinates);
  const url = `https://router.project-osrm.org/route/v1/driving/${finalCoordinates}?overview=false&steps=true`;
  try {
    const response = await axios.get(url);
    const routes = response.data;
    const steps = routes.routes[0].legs[0].steps;
    const waypoints = [];
    steps.forEach((step) => waypoints.push(step.intersections));
    const locations = [];
    waypoints.forEach((waypoint) => {
      waypoint.forEach((w) => {
        locations.push(w.location);
      });
    });
    const coordinates = [];
    locations.forEach((location) => {
      coordinates.push([
        location[1],
        location[0]
      ]);
    });
    return coordinates;
  } catch (error) {
    console.log(error);
  }
};
