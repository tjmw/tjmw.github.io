import {getRoutePoints} from "./route.js";
import {renderRoutePoints} from "./renderRoutePoints.js";
const render = (route) => {
  getRoutePoints(route).then(renderRoutePoints);
};
var routeSelect = document.getElementById("route");
render(routeSelect.value);
document.getElementById("route").addEventListener("change", function() {
  render(this.value);
});
