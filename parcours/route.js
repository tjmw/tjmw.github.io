import GpxParser from "./_snowpack/pkg/gpxparser.js";
import fixie from "./routeData/Fixie.gpx.proxy.js";
import breadAndCheese from "./routeData/Bread_Cheese_Route.gpx.proxy.js";
const rawGpxToPoints = (rawGpx) => {
  const gpx = new GpxParser();
  gpx.parse(rawGpx);
  return gpx.tracks[0].points;
};
const routeMappings = {
  fixie,
  breadAndCheese
};
export const getRoutePoints = (routeName) => {
  const routeReference = routeMappings[routeName];
  return fetch(routeReference).then((response) => {
    return response.text();
  }).then((rawGpxData) => {
    return rawGpxToPoints(rawGpxData);
  });
};
export const getRouteBounds = (points) => {
  const lons = points.map((p) => p.lon);
  const lats = points.map((p) => p.lat);
  const eles = points.map((p) => p.ele);
  return {
    minLon: Math.min(...lons),
    maxLon: Math.max(...lons),
    minLat: Math.min(...lats),
    maxLat: Math.max(...lats),
    minEle: Math.min(...eles),
    maxEle: Math.max(...eles)
  };
};
