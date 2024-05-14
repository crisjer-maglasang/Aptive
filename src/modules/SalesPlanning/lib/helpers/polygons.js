import * as turf from '@turf/turf';

export function doPolygonsIntersect(firstPolygon, secondPolygon) {
  const intersects = turf.intersect(firstPolygon, secondPolygon) ? true : false;

  return intersects;
};

export function unionPolygons(polygons) {
  let result = polygons[0];
  polygons.forEach(function (currentPolygon, polygonIndex) {
    if (polygonIndex > 0) {
      result = turf.union(result, currentPolygon);
    }
  });

  return result;
};
