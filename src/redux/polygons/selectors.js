export const selectStatistics = (state) => state.polygons.polygonStatistics;

export const selectPolygonPreview = (state) => state.polygons.preview;

export const selectPolygonDispositions = (state) => state.polygons.polygonDispositions?.items ?? [];

export const selectPolygonDispositionsCount = (state) => state.polygons.polygonDispositions?.total;
