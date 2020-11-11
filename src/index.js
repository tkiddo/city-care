import 'ol/ol.css';
import './index.scss';
import { Map, View } from 'ol';
import { Tile, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector } from 'ol/source';
import drawBoundary from './drawBoundary';
import addAnchor from './addAnchor';
import drawHotArea from './drawHotArea';
import { getPopup, showPopup } from './popup';

const center = [116.404177, 39.909652];

// 打点图层
const anchorLayer = new VectorLayer({
  source: new Vector()
});

// 边界图层
const boundaryLayer = new VectorLayer({
  source: new Vector()
});

// 地区热区图层
const hotAreaLayer = new VectorLayer({
  source: new Vector()
});

const map = new Map({
  target: 'map',
  layers: [
    new Tile({
      source: new OSM()
    }),

    boundaryLayer,
    hotAreaLayer,
    anchorLayer
  ],
  view: new View({
    projection: 'EPSG:4326',
    center,
    zoom: 6
  })
});

drawBoundary(boundaryLayer);

addAnchor(anchorLayer);

map.addOverlay(getPopup());

map.on('click', (event) => {
  const { pixel } = event;
  const pointFeature = map.forEachFeatureAtPixel(pixel, (feature) => feature);
  if (!pointFeature) return;
  console.log(pointFeature);
  const { data, type } = pointFeature.getProperties();
  if (type && type === 'anchor') {
    showPopup({ data });
  }
});

// eslint-disable-next-line consistent-return
map.on('pointermove', (event) => {
  const { pixel } = event;
  const pointFeature = map.forEachFeatureAtPixel(pixel, (feature) => feature);
  if (!pointFeature) return hotAreaLayer.getSource().clear();
  const { data, geometry, type } = pointFeature.getProperties();
  if (type && type === 'province') {
    drawHotArea({ data, geometry }, hotAreaLayer);
  }
});
