export const getBoundary = () =>
  // eslint-disable-next-line implicit-arrow-linebreak
  fetch('https://geo.datav.aliyun.com/areas_v2/bound/100000.json').then((res) => res.json());

export const another = () => {};
