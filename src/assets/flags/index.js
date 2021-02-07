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

const getFlagUrl = (lang) => {
  try {
    return icons[`${lang.toLowerCase()}.svg`].default;
  } catch (_) {
    return icons['en.svg'].default;
  }
};

export default getFlagUrl;
