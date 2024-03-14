import { APIProvider, Map } from '@vis.gl/react-google-maps';
import React, { useEffect, useState } from 'react';

import styles from '../map-styles';

export default function GoogleMap({
  lat,
  lng,
  segments,
  zoom,
}) {
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  const position = {lat, lng};
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <Map
        center={position}
        styles={styles}
        zoom={zoom}
      >
      </Map>
    </APIProvider>
  );
}
