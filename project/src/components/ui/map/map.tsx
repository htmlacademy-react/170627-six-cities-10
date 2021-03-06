import React, {useRef, useEffect} from 'react';
import {Icon, Marker} from 'leaflet';

import useMap from '../../../hooks/use-map';
import 'leaflet/dist/leaflet.css';
import {City, Points} from '../../../types/map-types';
import {defaultIcon, activeIcon} from '../../../const';

type MapProps = {
  city: City,
  points: Points,
  selectedPointID: number | null,
  containerClassName: string
};

function Map({containerClassName, city, points, selectedPointID}: MapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.lat,
          lng: point.lng
        });
        marker
          .setIcon(
            selectedPointID !== undefined && selectedPointID === point.id
              ? new Icon(activeIcon)
              : new Icon(defaultIcon)
          )
          .addTo(map);
      });
    }
  }, [map, points, selectedPointID]);

  return <section className={containerClassName} ref={mapRef}></section>;
}

export default Map;
