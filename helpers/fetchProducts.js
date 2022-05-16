const fetchProducts = async (keyProduct) => {
  const myPromise = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${keyProduct}`);
  const answer = await myPromise.json();
  return answer;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
