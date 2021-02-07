// import all svg's in ./ directory
function importAll(r) {
  const images = {};
  r.keys().map((item) => {
    images[item.replace('./', '')] = r(item);
    return item;
  });
  return images;
}

const icons = importAll(require.context('./', false, /\.(svg)$/));

const getBrandUrl = (brand) => {
  try {
    return icons[`${brand.toLowerCase()}.svg`].default;
  } catch (_) {
    return icons['google.svg'].default;
  }
};

export default getBrandUrl;
