/* eslint-disable radix */
// eslint-disable-next-line import/prefer-default-export
export const getColorByLevel = (level) => {
  switch (level) {
    case '优':
      return '#a8e05f';
    case '良':
      return '#fdd64b';
    case '轻度污染':
      return '#ff9b57';
    case '中度污染':
      return '#fe6a69';
    case '重度污染':
      return '#a97abc';
    case '严重污染':
      return '#a87383';
    default:
      return '#fdd64b';
  }
};

export const getQualityByAqi = (aqi) => {
  if (aqi < 50) {
    return '优';
  }
  if (aqi < 100) {
    return '良';
  }
  if (aqi < 150) {
    return '轻度污染';
  }
  if (aqi < 200) {
    return '中度污染';
  }
  if (aqi < 300) {
    return '重度污染';
  }
  return '严重污染';
};
