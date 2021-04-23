import * as THREE from "./_snowpack/pkg/three.js";
import {getRouteBounds} from "./route.js";
const COLOR_MAPPINGS = [14350246, 6607532, 16761600, 16734003, 13041721];
const colorFromEle = (ele, minEle, maxEle) => {
  const normalizedEle = THREE.MathUtils.mapLinear(ele, minEle, maxEle, 0, COLOR_MAPPINGS.length - 0.01);
  return COLOR_MAPPINGS[Math.floor(normalizedEle)];
};
export const renderRoutePoints = (routePoints) => {
  const {minLon, maxLon, minLat, maxLat, minEle, maxEle} = getRouteBounds(routePoints);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("scene").replaceChildren(renderer.domElement);
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
  camera.position.set(150, 0, 250);
  camera.lookAt(50, 75, 0);
  const scene = new THREE.Scene();
  const map = new THREE.Group();
  routePoints.forEach((rp, idx) => {
    const nextRp = routePoints[idx + 1];
    if (nextRp) {
      const lineColor = colorFromEle(rp.ele, minEle, maxEle);
      const material = new THREE.LineBasicMaterial({color: lineColor});
      const x = THREE.MathUtils.mapLinear(rp.lon, minLon, maxLon, 0, 100);
      const y = THREE.MathUtils.mapLinear(rp.lat, minLat, maxLat, 0, 150);
      const z = THREE.MathUtils.mapLinear(rp.ele, minEle, maxEle, 0, 20);
      const a = new THREE.Vector3(x, y, z);
      const x1 = THREE.MathUtils.mapLinear(nextRp.lon, minLon, maxLon, 0, 100);
      const y1 = THREE.MathUtils.mapLinear(nextRp.lat, minLat, maxLat, 0, 150);
      const z1 = THREE.MathUtils.mapLinear(nextRp.ele, minEle, maxEle, 0, 20);
      const b = new THREE.Vector3(x1, y1, z1);
      const geometry = new THREE.BufferGeometry().setFromPoints([a, b]);
      const line = new THREE.Line(geometry, material);
      map.add(line);
    }
  });
  scene.add(map);
  const animate = () => {
    requestAnimationFrame(animate);
    const shouldRotate = document.querySelector("#animate").checked;
    if (shouldRotate) {
      map.rotation.y += 0.01;
    }
    renderer.render(scene, camera);
  };
  animate();
};
