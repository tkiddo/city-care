/* eslint-disable radix */
export const getColorByBaiFenBi = (bili) => {
  // var 百分之一 = (单色值范围) / 50;  单颜色的变化范围只在50%之内
  const one = (255 + 255) / 100;
  let r = 0;
  let g = 0;
  let b = 0;

  if (bili < 50) {
    // 比例小于50的时候红色是越来越多的,直到红色为255时(红+绿)变为黄色.
    r = one * bili;
    g = 255;
  }
  if (bili >= 50) {
    // 比例大于50的时候绿色是越来越少的,直到0 变为纯红
    g = 255 - (bili - 50) * one;
    r = 255;
  }
  r = parseInt(r); // 取整
  g = parseInt(g); // 取整
  b = parseInt(b); // 取整

  // console.log("#"+r.toString(16,2)+g.toString(16,2)+b.toString(16,2));
  // return "#"+r.toString(16,2)+g.toString(16,2)+b.toString(16,2);
  // console.log("rgb("+r+","+g+","+b+")" );
  return `rgb(${r},${g},${b})`;
};

export const getColorByRate = (rate) => {
  switch (rate) {
    case '优':
      return getColorByBaiFenBi(0);
    case '良':
      return getColorByBaiFenBi(10);
    case '轻度污染':
      return getColorByBaiFenBi(30);
    case '中度污染':
      return getColorByBaiFenBi(50);
    case '重度污染':
      return getColorByBaiFenBi(70);
    case '严重污染':
      return getColorByBaiFenBi(100);
    default:
      return getColorByBaiFenBi(50);
  }
};
