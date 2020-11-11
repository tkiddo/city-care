import Overlay from 'ol/Overlay';

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
  let htmlString = '';
  Object.keys(data).forEach((key) => {
    const value = data[key];
    switch (key) {
      case 'area':
        htmlString += `<p>城市：${value}</p>`;
        break;
      case 'position_name':
        htmlString += `<p>监测点：${value}</p>`;
        break;
      case 'station_code':
        htmlString += `<p>监测点编码：${value}</p>`;
        break;
      case 'so2':
        htmlString += `<p>二氧化硫1小时平均：${value}</p>`;
        break;
      case 'no2':
        htmlString += `<p>二氧化氮1小时平均：${value}</p>`;
        break;
      case 'pm10':
        htmlString += `<p>颗粒物（粒径小于等于10μm）1小时平均：${value}</p>`;
        break;
      case 'co':
        htmlString += `<p>一氧化碳1小时平均：${value}</p>`;
        break;
      case 'o3':
        htmlString += `<p>臭氧1小时平均：${value}</p>`;
        break;
      case 'pm2_5':
        htmlString += `<p>颗粒物（粒径小于等于2.5μm）1小时平均：${value}</p>`;
        break;
      case 'primary_pollutant':
        htmlString += `<p>首要污染物：${value}</p>`;
        break;
      case 'quality':
        htmlString += `<p>空气质量指数类别：${value}</p>`;
        break;
      default:
        break;
    }
  });
  return htmlString;
};

export const getPopup = () => overlay;

export const showPopup = (options) => {
  const { coordinate, data } = options;
  content.innerHTML = createHtmlStringByData(data);
  overlay.setPosition(coordinate);
};
