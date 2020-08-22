const sizes = {
  giant: 1440,
  bigDesktop: 1200,
  desktop: 1000,
  tablet: 768,
  thone: 600,
  phablet: 480,
  phone: 376,
  tiny: 330,
};

interface MeidaProp {
  giant: Function;
  bigDesktop: Function;
  desktop: Function;
  tablet: Function;
  thone: Function;
  phablet: Function;
  phone: Function;
  tiny: Function;
}

export const media: MeidaProp = Object.keys(sizes).reduce((accumulator, label) => {
  const emSize = sizes[label] / 16;
  accumulator[label] = `
    @media (max-width: ${emSize}em) 
  `;
  return accumulator;
}, {}) as MeidaProp;

export default media;
