import { Feature } from 'ol';
import { MultiPolygon } from 'ol/geom';
import { Fill, Stroke, Style } from 'ol/style';
import { getBoundary } from './api';

const generateBoundary = (coordinates, vectorLayer) => {
  const feature = new Feature({
    geometry: new MultiPolygon(coordinates)
  });

  const stroke = new Stroke({
    color: 'darkblue',
    width: 3
  });

  const fill = new Fill({
    color: 'rgba(0,0,0,0.5)'
  });
  feature.setStyle(
    new Style({
      stroke,
      fill
    })
  );

  vectorLayer.getSource().addFeature(feature);
};

export default function drawBoundary(vectorLayer) {
  getBoundary().then((res) => {
    generateBoundary(res.features[0].geometry.coordinates, vectorLayer);
  });
}
