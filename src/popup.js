import Overlay from 'ol/Overlay';
import { getColorByLevel } from './utils';

/**
 * Elements that make up the popup.
 */
const container = document.getElementById('popup');
const content = document.getElementById('popup-content');
const closer = document.getElementById('popup-closer');

/**
 * Create an overlay to anchor the popup to the map.
 */
const overlay = new Overlay(
  /** @type {olx.OverlayOptions} */ ({
    element: container,
    autoPan: true,
    autoPanAnimation: {
      duration: 250 // 当Popup超出地图边界时，为了Popup全部可见，地图移动的速度. 单位为毫秒（ms）
    }
  })
);

export const hidePopup = () => {
  overlay.setPosition(undefined);
  closer.blur();
};

/**
 * Add a click handler to hide the popup.
 * @return {boolean} Don't follow the href.
 */
closer.onclick = function onClick() {
  hidePopup();
  return false;
};

const createHtmlStringByData = (data) => {
  // eslint-disable-next-line camelcase, object-curly-newline
  const { aqi, area, quality, position_name } = data;
  // eslint-disable-next-line camelcase
  const header = `<div class='content-header'>${area} ${position_name}</div>`;
  const info = `
  <div class='content-info' style='background:${getColorByLevel(quality)}'>
    <div class='content-aqi'>
      <div class='content-title'>AQI</div>
      <div class='content-value'>${aqi}</div>
    </div>
    <div class='content-quality'>${quality}</div>
  </div>`;
  return `${header}${info}`;
};

export const getPopup = () => overlay;

export const showPopup = (options) => {
  const { coordinate, data } = options;
  content.innerHTML = createHtmlStringByData(data);
  overlay.setPosition(coordinate);
};
