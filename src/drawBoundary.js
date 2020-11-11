import { Feature } from 'ol';
import { MultiPolygon } from 'ol/geom';
import { Fill, Stroke, Style } from 'ol/style';
import { getBoundary } from './api';

const generateBoundary = (element, vectorLayer) => {
  const feature = new Feature({
    geometry: new MultiPolygon(element.geometry.coordinates),
    data: element.properties,
    type: 'province'
  });

  const stroke = new Stroke({
    color: 'darkblue',
    width: 1.5
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
    const { features } = res;
    features.forEach((element) => {
      generateBoundary(element, vectorLayer);
    });
  });
}
