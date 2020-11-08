import 'ol/ol.css';
import { Map, View, Feature } from 'ol';
import { Tile, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector } from 'ol/source';
import { Point } from 'ol/geom';
import { Fill, Circle, Style } from 'ol/style';
import { getColorByRate } from './utils';

import coords from './assets/cords';
import data from './assets/data';

const center = [116.404177, 39.909652];

const generateAnchor = (raw, coord, layer) => {
  const anchor = new Feature({
    geometry: new Point(coord.coordinates)
  });
  const fill = new Fill({
    color: getColorByRate(raw.quality)
  });
  anchor.setStyle(
    new Style({
      image: new Circle({
        fill,
        radius: 5
      })
    })
  );
  layer.getSource().addFeature(anchor);
};

const vectorLayer = new VectorLayer({
  source: new Vector()
});

const map = new Map({
  target: 'map',
  layers: [
    new Tile({
      source: new OSM()
    }),
    vectorLayer
  ],
  view: new View({
    projection: 'EPSG:4326',
    center,
    zoom: 6
  })
});

let index = 0;
const len = data.length;
const addMarker = () => {
  generateAnchor(data[index], coords[index], vectorLayer);
  if (index < len) {
    index += 1;
    window.requestAnimationFrame(addMarker);
  }
};

window.requestAnimationFrame(addMarker);

map.on('click', () => {});
