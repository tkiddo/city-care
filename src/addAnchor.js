/* eslint-disable object-curly-newline */
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { Fill, Circle, Style, Text } from 'ol/style';
import { getColorByLevel, getQualityByAqi } from './utils';
import coords from './assets/cords';
import data from './assets/data';

const splitByCity = (rawArray, coordsArray) => {
  const result = {};
  let index = 0;
  const count = rawArray.length;
  while (index < count) {
    const { area } = rawArray[index];
    if (!result[area]) {
      result[area] = [];
    }
    result[area].push({ ...rawArray[index], ...coordsArray[index] });
    index += 1;
  }
  return result;
};

const generateAnchor = (raw, layer) => {
  const anchor = new Feature({
    geometry: new Point(raw.coordinates)
  });
  const fill = new Fill({
    color: getColorByLevel(raw.quality)
  });
  anchor.setStyle(
    new Style({
      image: new Circle({
        fill,
        radius: 15
      }),
      text: new Text({
        text: raw.aqi.toString(),
        fill: new Fill({
          color: '#ffffff'
        })
      })
    })
  );
  layer.getSource().addFeature(anchor);
};

export default function addAnchor(vectorLayer) {
  const aqiData = splitByCity(data, coords);
  Object.keys(aqiData).forEach((key) => {
    const item = aqiData[key];
    let aqiSum = 0;
    for (let i = 0; i < item.length; i += 1) {
      aqiSum += item[i].aqi;
    }
    const aqi = Math.ceil(aqiSum / item.length);
    const quality = getQualityByAqi(aqi);
    generateAnchor({ raw: item, coordinates: item[0].coordinates, aqi, quality }, vectorLayer);
  });
}
