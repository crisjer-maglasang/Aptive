import PropTypes from 'prop-types';
import {
  MapContainer,
  TileLayer,
  ScaleControl,
  LayersControl,
  ZoomControl,
} from 'react-leaflet';
import { sptConstants } from '../../lib';

const LeafletMap = ({
  center,
  zoom,
  children,
  onLayerChange = () => {},
}) => {
  const { BaseLayer } = LayersControl;

  // Defaults if no value is given
  const mapZoom = zoom ? zoom : 8;
  const mapCenter = center ? center : [40.6442, -111.9522];

  return (
    <MapContainer
      className="h-[800px]"
      center={mapCenter}
      zoom={mapZoom}
      scrollWheelZoom={true}
      updateWhenIdle={false}
      zoomControl={false}
      doubleClickZoom={false}
    >
      <ScaleControl />
      <ZoomControl position="topright" />
      <LayersControl position="bottomright">
        <BaseLayer checked name={sptConstants.OPEN_STREET_MAP}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            eventHandlers={{
              add: (e) => {
                onLayerChange(sptConstants.OPEN_STREET_MAP);
              },
            }}
          />
        </BaseLayer>
        <BaseLayer name={sptConstants.GOOGLE_MAPS}>
          <TileLayer
            url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
            attribution="Imagery ©2022 TerraMetrics, Map data ©2022 Google, INEGI"
            maxZoom={20}
            subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
            eventHandlers={{
              add: (e) => {
                onLayerChange(sptConstants.GOOGLE_MAPS);
              },
            }}
          />
        </BaseLayer>
        <BaseLayer name={sptConstants.GOOGLE_HYBRID}>
          <TileLayer
            url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
            attribution="Imagery ©2022 TerraMetrics, Map data ©2022 Google, INEGI"
            maxZoom={20}
            subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
            eventHandlers={{
              add: (e) => {
                onLayerChange(sptConstants.GOOGLE_HYBRID);
              },
            }}
          />
        </BaseLayer>
        <BaseLayer name={sptConstants.GOOGLE_SATELLITE}>
          <TileLayer
            url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
            attribution="Imagery ©2022 TerraMetrics, Map data ©2022 Google, INEGI"
            maxZoom={20}
            subdomains={['mt1', 'mt2', 'mt3']}
            eventHandlers={{
              add: (e) => {
                onLayerChange(sptConstants.GOOGLE_SATELLITE);
              },
            }}
          />
        </BaseLayer>
      </LayersControl>
      {children}
    </MapContainer>
  );
};

LeafletMap.propTypes = {
  markers: PropTypes.array,
  center: PropTypes.array,
  zoom: PropTypes.number,
  onLayerChange: PropTypes.func,
  children: PropTypes.node,
};

export default LeafletMap;
