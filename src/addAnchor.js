/* eslint-disable object-curly-newline */
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { Fill, Circle, Style } from 'ol/style';
import { getColorByLevel } from './utils';
import coords from './assets/cords';
import data from './assets/data';

// const splitByCity = (rawArray, coordsArray) => {
//   const result = {};
//   let index = 0;
//   const count = rawArray.length;
//   while (index < count) {
//     const { area } = rawArray[index];
//     if (!result[area]) {
//       result[area] = [];
//     }
//     result[area].push({ ...rawArray[index], ...coordsArray[index] });
//     index += 1;
//   }
//   return result;
// };

const generateAnchor = (raw, layer) => {
  const anchor = new Feature({
    geometry: new Point(raw.coordinates),
    name: raw.position_name,
    data: raw,
    type: 'anchor'
  });
  const fill = new Fill({
    color: getColorByLevel(raw.quality)
  });
  anchor.setStyle(
    new Style({
      image: new Circle({
        fill,
        radius: 8
      })
      // text: new Text({
      //   text: raw.aqi.toString(),
      //   fill: new Fill({
      //     color: '#fff'
      //   })
      // })
    })
  );
  layer.getSource().addFeature(anchor);
};

export default function addAnchor(vectorLayer) {
  let index = 0;
  const len = data.length;
  const step = () => {
    if (index < len) {
      generateAnchor({ ...data[index], ...coords[index] }, vectorLayer);
      window.requestAnimationFrame(step);
    }
    index = 1;
  };
  window.requestAnimationFrame(step);
}
