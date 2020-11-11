import { Feature } from 'ol';
import { Fill, Style, Text } from 'ol/style';

export default function drawHotArea(element, vectorLayer) {
  const { data, geometry } = element;
  const feature = new Feature({
    geometry,
    data,
    type: 'province-hot'
  });
  const fill = new Fill({
    color: 'rgba(255,255,255,0.5)'
  });
  const text = new Text({
    font: 'bold 24px serif',
    text: data.name,
    fill: new Fill({
      color: '#17a2b8'
    })
  });
  feature.setStyle(
    new Style({
      fill,
      text
    })
  );
  vectorLayer.getSource().clear();
  vectorLayer.getSource().addFeature(feature);
}
